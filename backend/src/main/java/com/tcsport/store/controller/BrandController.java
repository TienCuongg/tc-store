package com.tcsport.store.controller;

import com.tcsport.store.entity.Brand;
import com.tcsport.store.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandRepository brandRepository;

    @GetMapping
    public ResponseEntity<List<Brand>> getBrands() {
        return ResponseEntity.ok(brandRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Brand> createBrand(@RequestBody Brand brand) {
        if (brandRepository.existsByName(brand.getName())) {
            throw new RuntimeException("Thương hiệu đã tồn tại!");
        }
        return ResponseEntity.ok(brandRepository.save(brand));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Brand> updateBrand(@PathVariable Long id, @RequestBody Brand updated) {
        Brand b = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Thương hiệu không tồn tại!"));
        b.setName(updated.getName().trim());
        b.setOrigin(updated.getOrigin());
        b.setDescription(updated.getDescription());
        return ResponseEntity.ok(brandRepository.save(b));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBrand(@PathVariable Long id) {
        brandRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
