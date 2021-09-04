package com.codegym.restaurant.security;

import com.codegym.restaurant.service.employee.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Autowired
    private IEmployeeService employeeService;
    
    @Autowired
    private JwtRequestFilter jwtRequestFilter;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
    
    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(employeeService).passwordEncoder(passwordEncoder());
    }
    
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                  .antMatchers( ",","/login","/dist/**", "/api/login", "/css/**","/product/**","/vouchers/**","/js/**", "/api/register","/dashboard/**", "/register").permitAll()
                  .anyRequest().authenticated()
                  .and()
                  .formLogin()
                  .loginProcessingUrl("/login")
                  .loginPage("/login")
                  .usernameParameter("username")
                  .passwordParameter("password")
                  .defaultSuccessUrl("/dashboard")
                  .and().exceptionHandling().accessDeniedPage("/error/403")
                  .and().csrf().disable();
        http.logout()
                  .logoutSuccessUrl("/login")
                  .logoutUrl("/logout")
                  .deleteCookies("JWT").invalidateHttpSession(true)
                  .permitAll();
        
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                  .csrf().disable();
    }
}