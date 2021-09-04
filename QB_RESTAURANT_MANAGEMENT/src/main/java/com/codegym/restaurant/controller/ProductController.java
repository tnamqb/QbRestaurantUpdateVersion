package com.codegym.restaurant.controller;

import com.codegym.restaurant.model.Category;
import com.codegym.restaurant.model.Product;
import com.codegym.restaurant.service.category.ICategoryService;
import com.codegym.restaurant.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@RestController
@RequestMapping()
public class ProductController {

    @Autowired
    private IProductService productService;

    @Autowired
    private ICategoryService categoryService;

    @GetMapping("/listProduct")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ModelAndView listProduct() {
        return new ModelAndView("/dashboard/product/listProduct");
    }

    @GetMapping("/listHiddenProduct")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ModelAndView listHiddenProduct() {
        return new ModelAndView("/dashboard/product/listHiddenProduct");
    }

    @GetMapping("/listCategory")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ModelAndView listCategory() {
        return new ModelAndView("/dashboard/product/listProduct");
    }

    @PostMapping("/createCategory")
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        return new ResponseEntity<>(categoryService.save(category),HttpStatus.CREATED);
    }

    @GetMapping("/allProduct")
    public ResponseEntity<Iterable<Product>> listAllProduct(){
        return new ResponseEntity<>(productService.findAllByOrderByProductIdDesc(),HttpStatus.OK);
    }

    @GetMapping("/allCategory")
    public ResponseEntity<Iterable<Category>> allCategory(){
        return new ResponseEntity<>(categoryService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/createProduct")
    public ResponseEntity<Product> createProduct(@RequestBody Product product){
        String productName = product.getProductName();
        Optional<Product> product1 = productService.findByProductName(productName);
        if (!product1.isPresent()){
            product.setStatus(true);
            return new ResponseEntity<>(productService.save(product),HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/deleteProduct/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable Long id) {
        Optional<Product> productOptional = productService.findById(id);
        if (!productOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.deleteProductById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/editProduct/{id}")
    public ResponseEntity<Product> productResponseEntity(@PathVariable Long id){
        Product productOptional = productService.findById(id).get();
        return new ResponseEntity<>(productOptional,HttpStatus.OK);
    }

    @GetMapping("/allHiddenProduct")
    public ResponseEntity<Iterable<Product>> allHiddenProduct(){
        return new ResponseEntity<>(productService.findAllByOrderByProductHiddenDesc(),HttpStatus.OK);
    }

    @PutMapping("/restoreProduct/{id}")
    public ResponseEntity<Product> restoreProduct(@PathVariable Long id) {
        Optional<Product> productOptional = productService.findById(id);
        if (!productOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.restoreProductById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/editProduct")
    public ResponseEntity<Product> editProduct(@RequestBody Product product){
        product.getCategory().setCategoryName(categoryService.findById(product.getCategory().getCategoryId()).get().getCategoryName());
        return new ResponseEntity<>(productService.save(product),HttpStatus.OK);
    }
}
