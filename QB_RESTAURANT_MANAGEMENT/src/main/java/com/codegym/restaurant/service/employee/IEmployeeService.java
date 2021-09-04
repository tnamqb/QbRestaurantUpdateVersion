package com.codegym.restaurant.service.employee;


import com.codegym.restaurant.model.Employee;
import com.codegym.restaurant.security.UserPrincipal;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface IEmployeeService extends UserDetailsService {
    Iterable<Employee> findAll();
    Employee createUser(Employee employee);

    Optional<Employee> findEmployeeByPhone(Integer phoneNumber);

    UserPrincipal findByUsername(String username);
}
