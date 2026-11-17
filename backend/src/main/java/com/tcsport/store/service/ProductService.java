package com.tcsport.store.service;

import com.tcsport.store.dto.ProductDTO;
import com.tcsport.store.entity.Product;
import com.tcsport.store.entity.ProductSize;
import com.tcsport.store.repository.ProductRepository;
import com.tcsport.store.repository.ProductSizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductSizeRepository productSizeRepository;

    public List<ProductDTO.ProductResponse> searchProducts(String brand, String category, String keyword) {
        String cleanBrand = (brand != null && !brand.equalsIgnoreCase("all") && !brand.isBlank()) ? brand.trim() : null;
        String cleanCategory = (category != null && !category.equalsIgnoreCase("all") && !category.isBlank()) ? category.trim() : null;
        String cleanKeyword = (keyword != null && !keyword.isBlank()) ? keyword.trim() : null;

        List<Product> products = productRepository.searchCatalog(cleanBrand, cleanCategory, cleanKeyword);
        return products.stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    public ProductDTO.ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm có mã: #" + id));
        return toResponseDTO(product);
    }

    @Transactional
    public ProductDTO.ProductResponse createProduct(ProductDTO.ProductRequest request) {
        Product product = Product.builder()
                .sku(request.getSku() != null ? request.getSku().trim() : "TC-" + System.currentTimeMillis() % 10000)
                .name(request.getName().trim())
                .brand(request.getBrand() != null ? request.getBrand().trim() : "TC Sport")
                .category(request.getCategory() != null ? request.getCategory().trim() : "running")
                .price(request.getPrice() != null ? request.getPrice() : 1500000L)
                .costPrice(request.getCostPrice() != null ? request.getCostPrice() : Math.round((request.getPrice() != null ? request.getPrice() : 1500000L) * 0.65))
                .originalPrice(request.getOriginalPrice())
                .discount(request.getDiscount())
                .badgeSale(request.getBadgeSale())
                .badgeNew(request.getBadgeNew())
                .image(request.getImage() != null ? request.getImage() : "assets/images/hero-sneaker.jpg")
                .color(request.getColor() != null ? request.getColor() : "Đa sắc")
                .description(request.getDescription())
                .soldCount(0)
                .rating(5.0)
                .build();

        Product saved = productRepository.save(product);

        // Tạo danh sách kích cỡ và số lượng tồn kho
        Map<Integer, Integer> stockMap = request.getSizeStock();
        List<Integer> sizesList = request.getSizes();

        if (sizesList == null || sizesList.isEmpty()) {
            sizesList = List.of(39, 40, 41, 42, 43);
        }

        List<ProductSize> sizeEntities = new ArrayList<>();
        for (Integer sz : sizesList) {
            int qty = (stockMap != null && stockMap.containsKey(sz)) ? stockMap.get(sz) : 5;
            sizeEntities.add(ProductSize.builder()
                    .product(saved)
                    .size(sz)
                    .stock(qty)
                    .build());
        }

        productSizeRepository.saveAll(sizeEntities);
        saved.setSizes(sizeEntities);

        return toResponseDTO(saved);
    }

    @Transactional
    public ProductDTO.ProductResponse updateProduct(Long id, ProductDTO.ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm có mã: #" + id));

        if (request.getSku() != null) product.setSku(request.getSku().trim());
        if (request.getName() != null) product.setName(request.getName().trim());
        if (request.getBrand() != null) product.setBrand(request.getBrand().trim());
        if (request.getCategory() != null) product.setCategory(request.getCategory().trim());
        if (request.getPrice() != null) product.setPrice(request.getPrice());
        if (request.getCostPrice() != null) product.setCostPrice(request.getCostPrice());
        if (request.getOriginalPrice() != null) product.setOriginalPrice(request.getOriginalPrice());
        if (request.getDiscount() != null) product.setDiscount(request.getDiscount());
        if (request.getBadgeSale() != null) product.setBadgeSale(request.getBadgeSale());
        if (request.getBadgeNew() != null) product.setBadgeNew(request.getBadgeNew());
        if (request.getImage() != null) product.setImage(request.getImage());
        if (request.getColor() != null) product.setColor(request.getColor());
        if (request.getDescription() != null) product.setDescription(request.getDescription());

        // Cập nhật sizes & stock nếu có
        if (request.getSizeStock() != null && !request.getSizeStock().isEmpty()) {
            Map<Integer, Integer> newStock = request.getSizeStock();
            Map<Integer, ProductSize> existingMap = product.getSizes().stream()
                    .collect(Collectors.toMap(ProductSize::getSize, ps -> ps));

            for (Map.Entry<Integer, Integer> entry : newStock.entrySet()) {
                Integer sz = entry.getKey();
                Integer qty = entry.getValue();
                if (existingMap.containsKey(sz)) {
                    existingMap.get(sz).setStock(qty);
                } else {
                    ProductSize newPs = ProductSize.builder()
                            .product(product)
                            .size(sz)
                            .stock(qty)
                            .build();
                    product.getSizes().add(newPs);
                }
            }
        }

        Product saved = productRepository.save(product);
        return toResponseDTO(saved);
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Sản phẩm không tồn tại!");
        }
        productRepository.deleteById(id);
    }

    @Transactional
    public ProductDTO.ProductResponse quickRestock(Long id, Integer addQuantity) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm!"));

        int add = (addQuantity != null && addQuantity > 0) ? addQuantity : 10;
        for (ProductSize ps : product.getSizes()) {
            ps.setStock(ps.getStock() + add);
        }

        Product saved = productRepository.save(product);
        return toResponseDTO(saved);
    }

    public ProductDTO.ProductResponse toResponseDTO(Product p) {
        List<Integer> sizesList = new ArrayList<>();
        Map<Integer, Integer> stockMap = new LinkedHashMap<>();
        int totalStock = 0;

        if (p.getSizes() != null) {
            // Sort theo kích cỡ tăng dần
            List<ProductSize> sortedSizes = p.getSizes().stream()
                    .sorted(Comparator.comparing(ProductSize::getSize))
                    .toList();

            for (ProductSize ps : sortedSizes) {
                sizesList.add(ps.getSize());
                stockMap.put(ps.getSize(), ps.getStock());
                totalStock += ps.getStock();
            }
        }

        return ProductDTO.ProductResponse.builder()
                .id(p.getId())
                .sku(p.getSku())
                .name(p.getName())
                .brand(p.getBrand())
                .category(p.getCategory())
                .price(p.getPrice())
                .costPrice(p.getCostPrice() != null ? p.getCostPrice() : Math.round(p.getPrice() * 0.65))
                .originalPrice(p.getOriginalPrice())
                .discount(p.getDiscount())
                .soldCount(p.getSoldCount())
                .rating(p.getRating())
                .badgeSale(p.getBadgeSale())
                .badgeNew(p.getBadgeNew())
                .image(p.getImage())
                .color(p.getColor())
                .description(p.getDescription())
                .sizes(sizesList)
                .sizeStock(stockMap)
                .totalStock(totalStock)
                .build();
    }
}
