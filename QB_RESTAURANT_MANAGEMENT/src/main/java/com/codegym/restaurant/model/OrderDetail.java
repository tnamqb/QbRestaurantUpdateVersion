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
@Table(name = "orderDetails")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderDetailId;

    @Column(nullable = false)
    @Min(0)
    private int amount;

    @Column(nullable = false)
    @Min(0)
    private Double productPrice;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private  boolean status;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    public OrderDetail(Double productPrice, Product product, Order order) {
        this.productPrice = productPrice;
        this.product = product;
        this.order = order;
    }
}
