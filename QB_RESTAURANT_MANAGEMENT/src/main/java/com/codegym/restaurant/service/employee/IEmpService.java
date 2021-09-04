package com.codegym.restaurant.service.employee;

import com.codegym.restaurant.model.Employee;
import com.codegym.restaurant.service.IGeneralService;
import org.springframework.data.repository.query.Param;


public interface IEmpService extends IGeneralService<Employee> {
	
	int countEmployee();
	
	int countByStatusFalse();
}
