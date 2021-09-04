package com.codegym.restaurant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "staticsicals")
public class Statistical {
    
    @Id
    @Size(min = 4, max = 5)
    @Min(2020)
    private Long yearBill;

    
    private Double totalBillOfYear;

    private  Double janBill;

    private Double febBill;

    private Double marBill;

    private Double aprBill;

    private Double mayBill;

    private Double junBill;

    private Double julBill;

    private Double augBill;

    private Double sepBill;

    private Double octBill;

    private Double novBill;

    private Double decBill;
}
