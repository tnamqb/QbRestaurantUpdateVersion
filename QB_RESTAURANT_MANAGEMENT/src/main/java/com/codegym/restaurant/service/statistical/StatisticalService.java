package com.codegym.restaurant.service.statistical;

import com.codegym.restaurant.model.Statistical;
import com.codegym.restaurant.repository.IStatisticalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StatisticalService  implements  IStatisticalService{
	
	@Autowired
	private IStatisticalRepository statisticalRepository;
	
	@Override
	public Iterable<Statistical> findAll () {
		return statisticalRepository.findAll();
	}
	
	@Override
	public Optional<Statistical> findById (Long id) {
		return statisticalRepository.findById(id);
	}
	
	@Override
	public Statistical save (Statistical statistical) {
		return statisticalRepository.save(statistical);
	}
	
	@Override
	public void remove (Long id) {
		statisticalRepository.deleteById(id);
	}
}
