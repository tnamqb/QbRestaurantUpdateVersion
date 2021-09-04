package com.codegym.restaurant.repository;

import com.codegym.restaurant.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IOrderRepository  extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.desk.deskId = ?1")
    Optional<Order> findByDeskId(Long id);
}
