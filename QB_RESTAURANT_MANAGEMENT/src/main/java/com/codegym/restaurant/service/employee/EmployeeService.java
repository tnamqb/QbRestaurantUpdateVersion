package com.codegym.restaurant.service.employee;

import com.codegym.restaurant.model.Employee;
import com.codegym.restaurant.model.UserPrinciple;


import com.codegym.restaurant.repository.IEmployeeRepository;
import com.codegym.restaurant.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class EmployeeService implements IEmployeeService, IEmpService{
    
    @Autowired
    private IEmployeeRepository employeeRepository;
    
    @Override
    public Iterable<Employee> findAll() {
        return employeeRepository.findAll();
    }
    
    @Override
    public Optional<Employee> findById(Long id) {
        return employeeRepository.findById(id);
    }
    
    @Override
    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }
    
    @Override
    public void remove(Long id) {
        employeeRepository.deleteById(id);
    }
    
    @Override
    public Employee createUser(Employee employee) {
        return employeeRepository.saveAndFlush(employee);
    }

    @Override
    public Optional<Employee> findEmployeeByPhone(Integer phoneNumber) {
        return employeeRepository.findEmployeeByPhone(phoneNumber);
    }

    @Override
    public UserPrincipal findByUsername(String username) {
        Employee employee = employeeRepository.findByUsername(username);
        UserPrincipal userPrincipal = new UserPrincipal();
        if (null != employee) {
            Set<String> authorities = new HashSet<>();
//            if (null != user.getRole()) user.getRole()(r -> {
//                authorities.add(r.getRoleKey());
//                r.getPermissions().forEach(p -> authorities.add(p.getPermissionKey()));
//            });
            
            if (employee.getPosition() != null){
                authorities.add(employee.getPosition().getCode());
            }
            
            userPrincipal.setUserId(employee.getId());
            userPrincipal.setUsername(employee.getUsername());
            userPrincipal.setPassword(employee.getPassword());
            userPrincipal.setAuthorities(authorities);
        }
        return userPrincipal;
    }
    
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Employee> userOptional = Optional.ofNullable(employeeRepository.findByUsername(username));
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException(username);
        }
        return UserPrinciple.build(userOptional.get());
    }
    
    @Override
    public int countEmployee () {
        return employeeRepository.countEmployee();
    }
    
    @Override
    public int countByStatusFalse () {
        return employeeRepository.countByStatusFalse();
    }
   
}
