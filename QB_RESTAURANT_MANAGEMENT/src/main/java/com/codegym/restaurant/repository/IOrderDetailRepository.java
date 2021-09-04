package com.codegym.restaurant.repository;

import com.codegym.restaurant.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    Iterable<OrderDetail> findAllByOrderOrderId(Long id);
}
