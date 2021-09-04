package com.codegym.restaurant.service.bill;

import com.codegym.restaurant.model.Bill;
import com.codegym.restaurant.service.IGeneralService;

import java.sql.Date;

public interface IBillService extends IGeneralService<Bill> {
	int countByBillTime(Date date);
	
	Iterable<Bill> findByBillTime(Date date);
}
