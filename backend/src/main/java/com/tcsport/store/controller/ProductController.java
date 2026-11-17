package com.tcsport.store.controller;

import com.tcsport.store.dto.ProductDTO;
import com.tcsport.store.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO.ProductResponse>> getProducts(
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(productService.searchProducts(brand, category, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO.ProductResponse> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<ProductDTO.ProductResponse> createProduct(@RequestBody ProductDTO.ProductRequest request) {
        return ResponseEntity.ok(productService.createProduct(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO.ProductResponse> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductDTO.ProductRequest request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/restock")
    public ResponseEntity<ProductDTO.ProductResponse> quickRestock(
            @PathVariable Long id,
            @RequestParam(defaultValue = "10") Integer qty) {
        return ResponseEntity.ok(productService.quickRestock(id, qty));
    }
}
