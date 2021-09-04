package com.codegym.restaurant.service.orderDetail;

import com.codegym.restaurant.model.OrderDetail;
import com.codegym.restaurant.service.IGeneralService;

public interface IOrderDetailService extends IGeneralService<OrderDetail> {

    Iterable<OrderDetail> findAllByOrderOrderId(Long id);
}
