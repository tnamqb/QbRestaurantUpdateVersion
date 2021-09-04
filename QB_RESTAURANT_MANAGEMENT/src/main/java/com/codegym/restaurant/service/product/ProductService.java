package com.codegym.restaurant.service.product;

import com.codegym.restaurant.model.Product;
import com.codegym.restaurant.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class ProductService implements IProductService {

    @Autowired
    private IProductRepository productRepository;

    @Override
    public Iterable<Product> findAllByOrderByProductIdDesc() {
        return productRepository.findAllByOrderByProductIdDesc();
    }

    @Override
    public void deleteProductById(Long id) {
        productRepository.deleteProductById(id);
    }

    @Override
    public Iterable<Product> findAllByOrderByProductHiddenDesc() {
        return productRepository.findAllByOrderByProductHiddenDesc();
    }

    @Override
    public void restoreProductById(Long id) {
        productRepository.restoreProductById(id);
    }

    @Override
    public Optional<Product> findByProductName(String productName) {
        return productRepository.findByProductName(productName);
    }
    
    @Override
    public int countByStatusTrue () {
        return productRepository.countByStatusTrue();
    }

    @Override
    public Iterable<Product> findAllByCategoryCategoryId(Long id) {
        return productRepository.findAllByCategoryCategoryId(id);
    }

    @Override
    public Iterable<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void remove(Long id) {
        productRepository.deleteById(id);
    }
}
