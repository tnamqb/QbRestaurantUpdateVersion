var voucher  = voucher || {};


// danh sách khuyến mãi còn hạn //
voucher.voucherList = function(){
    $.ajax({
        url:`/vouchers/allVoucherValid`,
        method:'GET',
        success: function(response){
            $('.table-voucher tbody').empty();
            response = response.sort(function(vch1, vch2){
                return vch2.voucherId - vch1.voucherId;
            })
            $.each(response, function(index, item){
                $('.table-voucher tbody').append(`
                    <tr>     
                        <td>KM${item.voucherId}</td>
                        <td>${item.voucherName}</td>
                        <td class='text-right'>${item.percent}</td>
                        <td class='text-right'>${item.beginDate}</td>
                        <td class='text-right'>${item.endDate}</td>
                        <td class='text-left'>${item.note}</td>
                        <td class='text-right'>
                            ${item.status ?
                    '<span class="badge bg-primary">Đang áp dụng</span>' :
                    '<span class="badge bg-danger">Chờ</span>'}
                        </td>
                        <td class='text-center'>
                            <a href='javascript:;' class='btn btn-outline-success btn-sm'
                                title='Cập nhật khuyến mãi'
                                onclick="voucher.getVoucher(${item.voucherId})">
                                <i class='fa fa-pencil-alt'></i>
                            </a>
                            <a href='javascript:;' onclick="voucher.confirmChangeStatus(${item.voucherId}, ${item.status})" 
                                class='btn ${item.status ? "btn-outline-warning" : "btn-outline-secondary"} btn-sm'
                                    title='${item.status ? "Dừng KM" : "Áp dụng KM"}'>
                                    <i class='fa ${item.status ? "fa-lock-open" : "fa-lock"}'></i></a>
                            <a href='javascript:;' class='btn btn-outline-danger btn-sm' title='Ẩn khuyến mãi'
                                onclick="voucher.deleteTemporaryOrRestoreVoucher(${item.voucherId}, ${item.voucherDeleted})">
                                <i class='fa fa-trash'></i>
                            </a>
                        </td>
                    </tr>
                    `);
            });

        }
    })
};

// danh sách khuyến mãi hết hạn //
voucher.voucherExpiredList = function(){
    $.ajax({
        url:`/voucherExpired/allVoucherExpired`,
        method:'GET',
        success: function(response){
            $('.table-voucher-expired tbody').empty();
            response = response.sort(function(vch1, vch2){
                return vch2.voucherId - vch1.voucherId;
            })
            $.each(response, function(index, item){
                $('.table-voucher-expired tbody').append(`
                    <tr id="row'+${item.voucherId}+'">     
                    
                        <td>KM${item.voucherId}</td>
                        <td>${item.voucherName}</td>
                        <td class='text-right'>${item.percent}</td>
                        <td class='text-right'>${item.beginDate}</td>
                        <td class='text-right'>${item.endDate}</td>
                        <td class='text-left'>${item.note}</td>
                        <td class='text-center'>
                            <a href='javascript:;' class='btn btn-outline-danger btn-sm' title='Xóa khuyến mãi'
                                onclick="voucher.removeVoucher(${item.voucherId})">
                                <i class='fa fa-trash'></i>
                            </a>
                        </td>
                    </tr>
                    `);
            });

        }
    })
};

// danh sách khuyến mãi đã xóa //
voucher.voucherTrash = function(){
    $.ajax({
        url:`/trash/voucherListIsDeleted`,
        method:'GET',
        success: function(response){
            $('.table-voucher-trash tbody').empty();
            response = response.sort(function(vch1, vch2){
                return vch2.voucherId - vch1.voucherId;
            })
            $.each(response, function(index, item){
                $('.table-voucher-trash tbody').append(`
                    <tr id="row'+${item.voucherId}+'">     
                        <td>KM${item.voucherId}</td>
                        <td>${item.voucherName}</td>
                        <td class='text-right'>${item.percent}</td>
                        <td class='text-right'>${item.beginDate}</td>
                        <td class='text-right'>${item.endDate}</td>
                        <td class='text-left'>${item.note}</td>
                        <td class='text-center'>
                            <a href='javascript:;' class='btn btn-outline-warning btn-sm' title='Khôi phục khuyến mãi'
                                onclick="voucher.deleteTemporaryOrRestoreVoucher(${item.voucherId}, ${item.voucherDeleted})">
                                <i class='fa fa-window-restore'></i>
                            </a>
                            <a href='javascript:;' class='btn btn-outline-danger btn-sm' title='Xóa vĩnh viễn'
                                onclick="voucher.removeVoucher(${item.voucherId})">
                                <i class='fa fa-trash'></i>
                            </a>
                        </td>
                    </tr>
                    `);
            });
        }
    })
};

// lưu khuyến mãi //
voucher.save = function (){
    if( $('#voucherForm').valid()){
            let voucherId = $('input[name="voucherId"]').val();
        if( voucherId != 0) {
            let modifiObj = {};
            modifiObj.voucherName = $('input[name = "voucherName"]').val();
            modifiObj.percent = $('input[name = "percent"]').val();
            modifiObj.beginDate = $('input[name = "beginDate"]').val();
            modifiObj.endDate = $('input[name = "endDate"]').val();
            modifiObj.note = $('textarea[name = "note"]').val();
            modifiObj.voucherId = voucherId;
            $.ajax({
                url: `/vouchers/edit`,
                method: "PUT",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(modifiObj),
                success: function (result){
                    if(result){
                        voucher.voucherList();
                        $('#voucherModal').modal('hide');
                        App.showSuccessAlert(" Cập nhật khuyến mãi thành công");
                    }else{
                        App.showErrorAlert("Xảy ra lỗi, thử lại");
                    }
                }
            })
        }else{
            let createObj = {};
            createObj.voucherName = $('input[name = "voucherName"]').val();
            createObj.percent = $('input[name = "percent"]').val();
            createObj.beginDate = $('input[name = "beginDate"]').val();
            createObj.endDate = $('input[name = "endDate"]').val();
            createObj.note = $('textarea[name = "note"]').val();

            $.ajax({
                url: `/vouchers/add`,
                method: "POST",
                contentType:"application/json",
                dataType:"json",
                data: JSON.stringify(createObj),
                success: function (result){
                    if(result){
                        voucher.voucherList();
                        $('#voucherModal').modal('hide');
                        App.showSuccessAlert("Tạo khuyến mãi thành công");
                    }else{
                        App.showErrorAlert("Xảy ra lỗi, thử lại");
                    }
                }
            });
        };
    }
}


// đổ dữ liệu vào form sửa //
voucher.getVoucher = function (voucherId){
    $.ajax({
        url: `/vouchers/${voucherId}`,
        method:"GET",
        success: function (resp){
            $('input[name = "voucherId"]').val(resp.voucherId);
            $('input[name = "voucherName"]').val(resp.voucherName);
            $('input[name = "percent"]').val(resp.percent);
            $('input[name = "beginDate"]').val(resp.beginDate);
             $('input[name = "endDate"]').val(resp.endDate);
            $('textarea[name = "note"]').val(resp.note);

            $('#voucherModal').find('.modal-title').text("Cập nhật khuyến mãi");
            $('#voucherModal').modal('show');
            $("#beginDate")[0].setAttribute('min', $('input[name = "beginDate"]').val() );
            voucher.beginDateOnchange();
        }
    })
};


// Thay đổi trạng thái voucher (áp dụng hoặc chờ) //
voucher.confirmChangeStatus = function(voucherId, status){
    bootbox.confirm({
        title: "Thay đổi trạng thái khuyến mãi ?",
        message: `Chuyển trạng thái: ${status ? "Đang áp dụng" : "Chờ"}   => ${status ? "Chờ" : "Đang áp dụng"}  ?`,
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Hủy'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Chuyển'
            }
        },
        callback: function (result) {
            if(result){
                voucher.changeStatus(voucherId, status);
            }
        }
    });
};

voucher.changeStatus = function(voucherId, status){
    let updateStatusObj= {};
    updateStatusObj.status = !status;
    updateStatusObj.voucherId = voucherId;

    $.ajax({
        url:`/changeVoucherStatus`,
        method: "PUT",
        contentType:"application/json",
        datatype :"json",
        data: JSON.stringify(updateStatusObj),
        success: function(result){
            console.log(result);
            if(result){
                voucher.voucherList();
                App.showSuccessAlert("Trạng thái khuyến mãi đã thay đổi");
            }
            else{
                App.showErrorAlert("xuất hiện lỗi, thử lại");
            }
        }
    })
}


//Xóa khuyến mãi (xóa vĩnh viễn)//
voucher.removeVoucher = function (voucherId){
    bootbox.confirm({
        title: "Xóa khuyến mãi ?",
        message: "Bạn chắc chắn với quyết định này !",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Hủy'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Xóa'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: `/deleteVoucher/${voucherId}`,
                    method: 'DELETE',
                }).done( function () {
                            voucher.init();
                            App.showSuccessAlert("Xóa khuyến mãi thành công")
                        }).fail(function (){
                            App.showErrorAlert("Lỗi, thử lại ");
                        });
                    }
            }
    });
}


//xóa hoặc khôi phục khuyến mãi (xóa mềm) //
voucher.deleteTemporaryOrRestoreVoucher= function(voucherId, voucherDeleted){
    bootbox.confirm({
        title: "Một ngày đẹp trời !",
        message: "Bạn chắc chắn với quyết định này !",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Hủy'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Xác nhận'
            }
        },
        callback: function (result) {
            if (result) {
                let voucherIsDeletedObj= {};
                voucherIsDeletedObj.voucherDeleted = !voucherDeleted;
                voucherIsDeletedObj.voucherId = voucherId;

                $.ajax({
                    url:`/deleteTemporaryVoucher`,
                    method: "PUT",
                    contentType:"application/json",
                    datatype :"json",
                    data: JSON.stringify(voucherIsDeletedObj),
                }).done( function () {
                    voucher.init();
                    App.showSuccessAlert("Thành công")
                }).fail(function (){
                    App.showErrorAlert("Lỗi, thử lại ");
                });
            }
        }
    })
}

voucher.showModal = function() {
    voucher.reSet();
    $('#voucherModal').modal('show');
    voucher.validationBeginDate_EndDate();

};

voucher.validationBeginDate_EndDate = function (){
    $("#beginDate").val(getToday());
    $("#beginDate")[0].setAttribute('min', getToday());
    let beginDate = $("#beginDate").val();

    if (beginDate > getToday()) {
        $("#endDate")[0].setAttribute('min', beginDate);
    } else {
        $("#endDate")[0].setAttribute('min', getToday());
    }
    voucher.beginDateOnchange();
}

voucher.beginDateOnchange = function(){
    $("#beginDate").on("change", function () {
        let begin_date = $('input[name = "beginDate"]').val();
        let end_date = $("#endDate").val();

        if (begin_date > end_date) {
            $("#endDate").val(begin_date);
        }
        $("#endDate")[0].setAttribute('min', begin_date);
    })
}


function getToday(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
}


voucher.reSet = function(){
    $('#voucherForm').validate().resetForm();
    $('#voucherForm')[0].reset();
    $('#voucherModal').find('.modal-title').text("Tạo khuyến mãi");
}

voucher.init = function(){
    voucher.voucherList();
    voucher.voucherExpiredList();
    voucher.voucherTrash();
};

$(document).ready(function(){
    voucher.init();
});