package com.codegym.restaurant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.sql.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name= "vouchers")
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voucherId;

    @Column(nullable = false)
    @Size(min = 3, max = 255)
    private String voucherName;

    @Min (1)
    @Max(100)
    private int percent;
    
//    @Temporal(TemporalType.DATE)
//    @FutureOrPresent(message = "Khuyến mãi không thể bắt đầu từ quá khứ !")
    private Date beginDate;

    @Column(columnDefinition = "boolean default false")
    private boolean status;
    
    private String note;
    
    @Column(columnDefinition = "boolean default false")
    private boolean voucherDeleted;
    
    @Future(message = "Khuyến mãi kết thúc trong tương lai !")
    private Date endDate;
    
    public Voucher (Long voucherId, String voucherName, int percent, Date beginDate, Date endDate, String note) {
        this.voucherId = voucherId;
        this.voucherName = voucherName;
        this.percent = percent;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.note = note;
    }
    
    public Voucher (String voucherName, int percent, Date beginDate, boolean status, String note, Date endDate) {
        this.voucherName = voucherName;
        this.percent = percent;
        this.beginDate = beginDate;
        this.status = status;
        this.note = note;
        this.endDate = endDate;
    }
    
    public Voucher (String voucherName, int percent, Date beginDate, String note, Date endDate) {
        this.voucherName = voucherName;
        this.percent = percent;
        this.beginDate = beginDate;
        this.note = note;
        this.endDate = endDate;
    }
    
    public Voucher (Long voucherId, boolean status) {
        this.voucherId = voucherId;
        this.status = status;
    }
    
    public Voucher(boolean voucherDeleted, Long voucherId){
        this.voucherId = voucherId;
        this.voucherDeleted = voucherDeleted;
    }
    
    public Voucher (String voucherName, int percent, Date beginDate, boolean status, String note, boolean voucherDeleted, Date endDate) {
        this.voucherName = voucherName;
        this.percent = percent;
        this.beginDate = beginDate;
        this.status = status;
        this.note = note;
        this.voucherDeleted = voucherDeleted;
        this.endDate = endDate;
    }
    
    public boolean isStatus () {
        return status;
    }

    public void setStatus (boolean status) {
        this.status = status;
    }

    public boolean isVoucherDeleted () {
        return voucherDeleted;
    }

    public void setVoucherDeleted (boolean voucherDeleted) {
        this.voucherDeleted = voucherDeleted;
    }
}
