package com.tcsport.store.controller;

import com.tcsport.store.entity.Category;
import com.tcsport.store.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        if (categoryRepository.existsByCode(category.getCode())) {
            throw new RuntimeException("Mã danh mục đã tồn tại!");
        }
        return ResponseEntity.ok(categoryRepository.save(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category updated) {
        Category cat = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại!"));
        cat.setName(updated.getName().trim());
        cat.setDescription(updated.getDescription());
        if (updated.getCode() != null) cat.setCode(updated.getCode().trim());
        return ResponseEntity.ok(categoryRepository.save(cat));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
