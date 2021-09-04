package com.codegym.restaurant.service.voucher;

import com.codegym.restaurant.model.Voucher;
import com.codegym.restaurant.repository.IVoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class VoucherService implements IVoucherService {

    @Autowired
    private IVoucherRepository voucherRepository;
    @Override
    public Iterable<Voucher> findAll() {
        return voucherRepository.findAll();
    }

    @Override
    public Optional<Voucher> findById(Long id) {
        return voucherRepository.findById(id);
    }

    @Override
    public Voucher save(Voucher voucher) {
         return voucherRepository.save(voucher);
    }

    @Override
    public void remove(Long id) {
        voucherRepository.deleteById(id);
    }
    
    @Override
    public Iterable<Voucher> findAllByVoucherValid () {
        
        return voucherRepository.findAllByVoucherValid();
    }
    
    @Override
    public Iterable<Voucher> findAllByVoucherExpired () {
        return voucherRepository.findAllByVoucherExpired();
    }
    
    @Override
    public Iterable<Voucher> findAllByVoucherIsDeleted () {
        return voucherRepository.findAllByVoucherIsDeleted();
    }

    @Override
    public Iterable<Voucher> findVouchersIsApply() {
        return voucherRepository.findVouchersIsApply();
    }

}
