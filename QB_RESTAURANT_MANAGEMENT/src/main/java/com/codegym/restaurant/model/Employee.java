package com.codegym.restaurant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import javax.persistence.*;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employees")
public class Employee extends BaseEntity {

    @Column (nullable = false)
    @Size(min = 3, max = 200)
    private String username;

    @Column (nullable = false)
    @Size(min = 3, max = 50)
    private String password;

    @Column (nullable = false)
    @Size(min = 3, max = 150)
    private String fullName;

    @Column(nullable = false)
    @NumberFormat
    private int phone;

    @Column(nullable = false)
    @Past
    private Date dob;
    
    @Column(columnDefinition = "boolean default true")
    private boolean gender;


    private String avatar;

    @NumberFormat
    @Size(min = 10, max = 12)
    private String citizenId;

    @Column(columnDefinition = "boolean default false")
    private boolean status;

    @Size (max = 200)
    private String address;

    @ManyToOne
    @JoinColumn(name = "position_id")
    private Position position;

    @OneToMany(targetEntity = Order.class, fetch = FetchType.EAGER)
    private List<Order> orders;

}
