var order = order || {};
var orderDetal = orderDetal || {};

order.orderList = function (){
    $.ajax({
        url:`/order/listOrder`,
        method:'GET',
        success: function(response){
            $('.table-order tbody').empty();
            response = response.sort(function(ord1, ord2){
                return ord2.orderId - ord1.orderId;
            })
            $.each(response, function(index, item){
                $('.table-order tbody').append(`
                    <tr>     
                        <td>${item.desk.tableName}</td>
                        <td>OD${item.orderId}</td>
                        <td class='text-right'>${item.orderTime}</td>
                        <td class='text-center'>
                            <a href='javascript:;' class='btn btn-outline-primary btn-sm'
                                title='Chi tiết'
                                onclick="orderDetal.getOrderDetal(${item.orderId})">
                                <i class="fas fa-info-circle"></i>
                            </a>
                            <a href='javascript:;' class='btn btn-outline-success btn-sm'
                                title='Tạo hóa đơn'
                                onclick="">
                                <i class="fas fa-file-invoice-dollar"></i>
                            </a>
                        </td>
                    </tr>
                    `);
            });
        }
    })
}