package com.codegym.restaurant.controller;

import com.codegym.restaurant.model.*;
import com.codegym.restaurant.service.category.ICategoryService;
import com.codegym.restaurant.service.desk.IDeskService;
import com.codegym.restaurant.service.order.IOrderService;
import com.codegym.restaurant.service.orderDetail.IOrderDetailService;
import com.codegym.restaurant.service.product.IProductService;
import com.codegym.restaurant.service.voucher.IVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@RestController
@RequestMapping("/app")
public class AppController {
    @Autowired
    private IOrderService orderService;

    @Autowired
    private IProductService productService;

    @Autowired
    private IVoucherService voucherService;

    @Autowired
    private ICategoryService categoryService;

    @Autowired
    private IOrderDetailService orderDetailService;
    
    @Autowired
    private IDeskService deskService;

    private String getPrincipal() {
      String userName = "";
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            userName = ((UserDetails) principal).getUsername();

        } else {
            userName = principal.toString();
        }
        return userName;
    }

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('STAFF')")
    public ModelAndView applicationPage() {
        ModelAndView modelAndView = new ModelAndView("/application/application");
        modelAndView.addObject("userInfo", getPrincipal());
        return modelAndView;
    }

    @GetMapping("/getAllItem")
    public ModelAndView getAllItem(){
        ModelAndView modelAndView = new ModelAndView("/application/application");
        return modelAndView;
    }

    @GetMapping("/getAllItemVoucher")
    public ModelAndView getAllItemVoucher(){
        ModelAndView modelAndView = new ModelAndView("/application/application");
        return modelAndView;
    }

    @GetMapping("/allItemVoucherIsApply")
    public ResponseEntity<Iterable<Voucher>> voucherResponseEntity(){
        Iterable<Voucher> vouchers = voucherService.findVouchersIsApply();
        return new ResponseEntity<>(vouchers, HttpStatus.OK);
    }

    @GetMapping("/allItem")
    public ResponseEntity<Iterable<Product>> productResponseEntity(){
        Iterable<Product> products = productService.findAll();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/getAllItemCategory")
    public ModelAndView getAllItemCategory(){
        ModelAndView modelAndView = new ModelAndView("/application/application");
        return modelAndView;
    }

    @GetMapping("/allItemCategory")
    public ResponseEntity<Iterable<Category>> allItemCategory(){
        return new ResponseEntity<>(categoryService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/allProductByCategory/{id}")
    public ResponseEntity<Iterable<Product>> allProductResponseEntity(@PathVariable Long id) {
        Iterable<Product> products = productService.findAllByCategoryCategoryId(id);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("/createOrder")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        return new ResponseEntity<>(orderService.save(order), HttpStatus.CREATED);
    }

    @GetMapping("/getOrder/{id}")
    public ResponseEntity<Order> getOrderByIdTable(@PathVariable Long id) {
        return new ResponseEntity<>(orderService.findByDeskId(id).get(), HttpStatus.OK);
    }

    @PostMapping("/createOrderDetail")
    public ResponseEntity<OrderDetail> createOrderDetail(@RequestBody OrderDetail orderDetail){
        orderDetail.setAmount(1);
        orderDetail.setStatus(true);
        return new ResponseEntity<>(orderDetailService.save(orderDetail), HttpStatus.CREATED);
    }
    @GetMapping("/getAllOrderDetailOfDesk/{id}")
    public ResponseEntity<Iterable<OrderDetail>> getAllOrderDetailOfDesk(@PathVariable Long id){
        Optional<Desk> desk = deskService.findById(id);
        if (desk.isPresent()){
            Optional<Order> order = orderService.findByDeskId(id);
            if(order.isPresent()){
                Iterable<OrderDetail> orderDetails = orderDetailService.findAllByOrderOrderId(order.get().getOrderId());
                if (orderDetails.spliterator().getExactSizeIfKnown()>0){
                    return new ResponseEntity<>(orderDetails, HttpStatus.OK);
                }
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
 
}
