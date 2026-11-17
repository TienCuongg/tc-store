package com.tcsport.store.repository;

import com.tcsport.store.entity.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {
    List<ProductSize> findByProductId(Long productId);
    Optional<ProductSize> findByProductIdAndSize(Long productId, Integer size);
}
