package com.codegym.restaurant.controller.api;

import com.codegym.restaurant.model.Employee;
import com.codegym.restaurant.model.JwtResponse;
import com.codegym.restaurant.security.JwtUtil;
import com.codegym.restaurant.security.UserPrincipal;
import com.codegym.restaurant.service.employee.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class AuthController {


    @Autowired
    private IEmployeeService IEmployeeService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public Employee register(@RequestBody Employee employee) {
        employee.setPassword(new BCryptPasswordEncoder().encode(employee.getPassword()));
        return IEmployeeService.createUser(employee);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(HttpServletRequest request, @RequestBody Employee employee) {

        UserPrincipal userPrincipal = IEmployeeService.findByUsername(employee.getUsername());
        if (!new BCryptPasswordEncoder().matches(employee.getPassword(), userPrincipal.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("tài khoản hoặc mật khẩu không chính xác");
        }

        UserDetails userDetails = IEmployeeService.loadUserByUsername(employee.getUsername());
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                userDetails,
                userDetails.getUsername(),
                userDetails.getAuthorities());
        auth.setDetails(userDetails);
        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(auth);

        String jwt = jwtUtil.generateToken(userPrincipal);
        UserPrincipal currentUser = IEmployeeService.findByUsername(userPrincipal.getUsername());
        JwtResponse jwtResponse = new JwtResponse(
                jwt,
                currentUser.getUserId(),
                userDetails.getUsername(),
                userDetails.getAuthorities()
        );

        ResponseCookie springCookie = ResponseCookie.from("JWT", jwt)
                .httpOnly(false)
                .secure(false)
                .path("/")
                .maxAge(60 * 60 * 60 * 1000)
                .domain("localhost")
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, springCookie.toString())
                .body(jwtResponse);
    }

    @GetMapping("/users")
//    @PreAuthorize("hasAnyAuthority('USER_READ')")
    public ResponseEntity<Iterable<Employee>> getAllUser() {
        return new ResponseEntity<>(IEmployeeService.findAll(), HttpStatus.OK);
    }
    
    


}