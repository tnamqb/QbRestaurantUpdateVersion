package com.codegym.restaurant.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(nullable = false)
    @Size(min = 1, max = 200)
    private String productName;

    private String image;

    @Column(nullable = false)
    @Min(0)
    private Double price;

    private Boolean status;

    @Size(max = 2000000)
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_Id")
    private Category category;

    @OneToMany(targetEntity = OrderDetail.class, fetch = FetchType.EAGER)
    private Set<OrderDetail> orderDetails;


}
