package com.codegym.restaurant.service.bill;

import com.codegym.restaurant.model.Bill;
import com.codegym.restaurant.repository.IBillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.Optional;

@Service
@Transactional
public class BillService implements IBillService{
	@Autowired
	private IBillRepository billRepository;
	
	@Override
	public Iterable<Bill> findAll () {
		return billRepository.findAll();
	}
	
	@Override
	public Optional<Bill> findById (Long id) {
		return billRepository.findById(id);
	}
	
	@Override
	public Bill save (Bill bill) {
		return billRepository.save(bill);
	}
	
	@Override
	public void remove (Long id) {
	billRepository.deleteById(id);
	}
	
	@Override
	public int countByBillTime (Date date) {
		return billRepository.countByBillTime(date);
	}
	
	@Override
	public Iterable<Bill> findByBillTime (Date date) {
		return billRepository.findByBillTime(date);
	}
	
	
}
