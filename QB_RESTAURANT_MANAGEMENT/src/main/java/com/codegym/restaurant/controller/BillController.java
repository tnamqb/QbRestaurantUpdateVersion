package com.codegym.restaurant.controller;

import com.codegym.restaurant.model.Bill;
import com.codegym.restaurant.service.bill.IBillService;
import com.codegym.restaurant.service.order.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping()
public class BillController {
	@Autowired
	public IOrderService orderService;
	
	@Autowired
	public IBillService billService;
	
	
	@GetMapping ("/billHistory")
	@PreAuthorize ("hasAnyAuthority('ADMIN')")
	public ModelAndView listBill() {
		ModelAndView modelAndView = new ModelAndView("/dashboard/bill/listBill");
		return modelAndView;
	}
	
	@GetMapping("/listAllBill")
	public ResponseEntity<Iterable<Bill>> listAllBill(){
		return new ResponseEntity<>(billService.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/bill/{id}")
	public ResponseEntity<Bill> getBillById(@PathVariable Long id){
		Bill bill = billService.findById(id).get();
		return new ResponseEntity<>(bill, HttpStatus.OK);
	}
}
