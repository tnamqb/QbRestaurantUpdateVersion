package com.codegym.restaurant.controller;

import com.codegym.restaurant.model.Employee;
import com.codegym.restaurant.model.Position;
import com.codegym.restaurant.security.UserPrincipal;
import com.codegym.restaurant.service.employee.EmployeeService;
import com.codegym.restaurant.service.employee.IEmployeeService;
import com.codegym.restaurant.service.position.IPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("")
public class EmployeeController {

    @Autowired
    private IEmployeeService iEmployeeService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private IPositionService positionService;

    private String getPrincipal() {
        String userName = null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            userName = ((UserDetails) principal).getUsername();
        } else {
            userName = principal.toString();
        }
        return userName;
    }

    @GetMapping("/listEmployee")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ModelAndView listEmployee(){
        return new ModelAndView("/dashboard/employee/listEmployee");
    }

    @GetMapping("/allEmployee")
    public ResponseEntity<Iterable<Employee>> listAllEmployee(){
        return new ResponseEntity<>(iEmployeeService.findAll(),HttpStatus.OK);
    }


    @GetMapping("/listPosition")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ModelAndView listPosition() {
        return new ModelAndView("/dashboard/employee/listEmployee");
    }

    @GetMapping("/allPosition")
    public ResponseEntity<Iterable<Position>> allPosition(){
        return new ResponseEntity<>(positionService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getEmployee")
    public ResponseEntity<UserPrincipal> getUserByUsername(){
        return new ResponseEntity<>(iEmployeeService.findByUsername(getPrincipal()), HttpStatus.OK);
    }

    @PostMapping("/createEmployee")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee){
        Integer phoneNumber = employee.getPhone();
        Optional<Employee> employee1 = employeeService.findEmployeeByPhone(phoneNumber);
        if (!employee1.isPresent()){
            employee.getPosition().setPositionName(positionService.findById(employee.getPosition().getPositionId()).get().getPositionName());
            return new ResponseEntity<>(iEmployeeService.createUser(employee),HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleteEmployee/{id}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable Long id) {
        Optional<Employee> employeeOptional = employeeService.findById(id);
        if (!employeeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        employeeService.remove(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/editEmployee/{id}")
    public ResponseEntity<Employee> employeeResponseEntity(@PathVariable Long id){
        Employee employeeOptional = employeeService.findById(id).get();
        return new ResponseEntity<>(employeeOptional,HttpStatus.OK);
    }

    @PatchMapping("/editEmployee")
    public ResponseEntity<Employee> editEmployee(@RequestBody Employee employee){
        employee.getPosition().setPositionName(positionService.findById(employee.getPosition().getPositionId()).get().getPositionName());
        return new ResponseEntity<>(employeeService.save(employee),HttpStatus.OK);
    }
}
