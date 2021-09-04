package com.codegym.restaurant.repository;

import com.codegym.restaurant.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {

    @Query("select p from Product p where p.status = true")
    Iterable<Product> findAllByOrderByProductIdDesc();

    @Modifying
    @Query("update Product p set p.status = false where p.productId = :id")
    void deleteProductById(@Param("id") Long id);

    @Query("select p from Product p where p.status = false order by p.productId desc ")
    Iterable<Product> findAllByOrderByProductHiddenDesc();


    @Modifying
    @Query("update Product p set p.status = true where p.productId = :id")
    void restoreProductById(@Param("id") Long id);

    Optional<Product> findByProductName(String productName);


    @Query("select p from Product p where p.category.categoryId = ?1")
    Iterable<Product> findAllByCategoryCategoryId(Long id);

    
    @Modifying
    @Query("SELECT count (p) FROM Product  p where p.status = true group by  p.productId")
    int countProduct();
    
    int countByStatusTrue();
}
