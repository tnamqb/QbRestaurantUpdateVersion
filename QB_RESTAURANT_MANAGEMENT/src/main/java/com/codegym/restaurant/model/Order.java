package com.codegym.restaurant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(nullable = false)
//    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm")
    private Date orderTime;

    @ManyToOne
    @JoinColumn(name = "table_Id")
    private Desk desk;

    @OneToMany(targetEntity = OrderDetail.class, fetch = FetchType.EAGER)
    private Set<OrderDetail> orderDetails;

    public Order(Date orderTime, Desk desk) {
        this.orderTime = orderTime;
        this.desk = desk;
    }
}
