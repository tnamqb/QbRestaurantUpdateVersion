var bill = bill || {};

bill.billList = function(){
    $.ajax({
        url:`/listAllBill`,
        method:'GET',
        success: function(response){
            $('.table-bill tbody').empty();
            response = response.sort(function(bill1, bill2){
                return bill2.billId - bill1.billId;
            })
            $.each(response, function(index, item){
                $('.table-bill tbody').append(`
                    <tr id="row'+${item.billId}+'">     
                        <td>HD${item.billId}</td>
                        <td>${item.customerName}</td>
                        <td class='text-right'>${item.billTotal}</td>
                        <td class='text-right'>${item.billTime}</td>
                        <td>${item.billNote}</td>
                        <td class='text-center'>
                            <a href='javascript:;' class='btn btn-outline-success btn-sm' title='Chi tiết hóa đơn'
                                onclick="bill.billDetal(${item.billId})">
                                <i class="fas fa-info-circle"></i>
                            </a>
                        </td>
                    </tr>
                    `);
            });
        }
    })
};

bill.billDetal = function (billId){
    $.ajax({
        url: `/bill/${billId}`,
        method:"GET",
        success: function (resp){
            // $('#productName').val(resp.productName);
            // $('#amount').val(resp.amount);
            // $('#productPrice').val(resp.productPrice);
            // $('#intoMoney').val((resp.amount)*(resp.productPrice));
            $('#billModal').modal('show');
        }
    })
};

bill.init = function(){
    bill.billList();
};

$(document).ready(function(){
    bill.init();
});