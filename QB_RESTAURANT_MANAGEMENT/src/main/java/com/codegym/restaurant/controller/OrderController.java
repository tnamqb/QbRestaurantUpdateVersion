package com.codegym.restaurant.controller;

import com.codegym.restaurant.model.Order;
import com.codegym.restaurant.model.Voucher;
import com.codegym.restaurant.service.desk.IDeskService;
import com.codegym.restaurant.service.order.IOrderService;
import com.codegym.restaurant.service.orderDetail.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class OrderController {
	
	@Autowired
	public IOrderService orderService;
	
	@Autowired
	public IOrderDetailService orderDetailService;

	@Autowired
	public IDeskService deskService;

	
	@GetMapping ("/orders")
	@PreAuthorize ("hasAnyAuthority('STAFF')")
	public ModelAndView orderList() {
		ModelAndView modelAndView = new ModelAndView("/app/order/listOrder");
		return modelAndView;
	}
	
	@GetMapping("/order/listOrder")
	public ResponseEntity<Iterable<Order>> listAllOrder(){
		return new ResponseEntity<>(orderService.findAll(), HttpStatus.OK);
	}
}
