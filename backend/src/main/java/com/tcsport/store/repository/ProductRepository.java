package com.tcsport.store.repository;

import com.tcsport.store.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByBrandIgnoreCase(String brand);

    List<Product> findByCategoryIgnoreCase(String category);

    @Query("SELECT p FROM Product p WHERE " +
           "(:brand IS NULL OR LOWER(p.brand) = LOWER(:brand)) AND " +
           "(:category IS NULL OR LOWER(p.category) = LOWER(:category)) AND " +
           "(:keyword IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Product> searchCatalog(@Param("brand") String brand,
                               @Param("category") String category,
                               @Param("keyword") String keyword);

    List<Product> findTop10ByOrderByIdAsc();
}
