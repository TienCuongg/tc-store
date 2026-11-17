package com.tcsport.store.repository;

import com.tcsport.store.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderCode(String orderCode);

    List<Order> findByCustomerPhoneOrderByCreatedAtDesc(String customerPhone);

    List<Order> findAllByOrderByCreatedAtDesc();

    @Query("SELECT o FROM Order o WHERE o.createdAt >= :startDate AND o.createdAt <= :endDate ORDER BY o.createdAt ASC")
    List<Order> findOrdersBetweenDates(LocalDateTime startDate, LocalDateTime endDate);
}
