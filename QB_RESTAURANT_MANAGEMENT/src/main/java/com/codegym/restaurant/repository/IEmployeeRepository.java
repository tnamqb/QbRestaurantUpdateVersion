package com.codegym.restaurant.repository;

import com.codegym.restaurant.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface IEmployeeRepository extends JpaRepository<Employee, Long> {
    Employee findByUsername(String username);

    Optional<Employee> findEmployeeByPhone(Integer phoneNumber);
    
    @Modifying
    @Query("SELECT count (e) FROM Employee  e where e.status = false group by e.id ")
    int countEmployee();
    
    int countByStatusFalse();
}
