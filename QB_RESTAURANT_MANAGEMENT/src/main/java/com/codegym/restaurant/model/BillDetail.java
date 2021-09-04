package com.codegym.restaurant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "billDetails")
public class BillDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billDetailId;
    
    @Column(nullable = false)
    @Min (0)
    private int amount;
    
    @Column(nullable = false)
    @Min(0)
    private Double productPrice;
    
    @Column(nullable = false)
    private String productName;

    
    @ManyToOne
    @JoinColumn(name = "bill_Id")
    private Bill bill;
}
