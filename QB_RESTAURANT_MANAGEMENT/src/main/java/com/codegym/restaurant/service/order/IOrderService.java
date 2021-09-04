package com.codegym.restaurant.service.order;

import com.codegym.restaurant.model.Order;
import com.codegym.restaurant.service.IGeneralService;

import java.util.Optional;

public interface IOrderService extends IGeneralService<Order> {

    Optional<Order> findByDeskId(Long id);
}
