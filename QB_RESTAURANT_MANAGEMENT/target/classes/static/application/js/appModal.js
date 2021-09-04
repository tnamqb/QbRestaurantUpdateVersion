function getAllDeskActivate(){
    $.ajax({
        type: "GET",
        url: "/allDesk"
    }).done(function (desks){
        let content = "";
        for (let i = 0; i < desks.length; i++) {
            content += `
                    <div class="styleFrames bg-white " style="float: left" onclick="getAllOrderDetailOfDesk(${desks[i].deskId}, '${desks[i].deskName}')">
                            ${desks[i].hidden ?
                        '' :
                        `<div class="styleImage "  style="cursor: pointer">
                                ${desks[i].custom ?
                                '<img src="/uploads/table/table1.jpg"  style="border: 2px solid red">' :
                                '<img src="/uploads/table/table2.jpg" style="border: 2px solid blue">'}
                                <div class="overlay">
                                        <p class="text" style="color: white; font-weight: 400">
                                              ${desks[i].deskName}<br>
                                              ${desks[i].book && desks[i].book !== (null +"h "+ null) ?
                                            `<span style="color: red">(Bàn đặt : ${desks[i].book})</span>` :
                                            ''}
                                        </p>
                                </div>
                        </div>`}
                    </div>
                `;
        }
        $(".categories").hide();
        $(".button-action").hide();
        $(".menu-action").hide();
        $("#deskDisplay").show();
        $("#deskDisplay").html(content);
    })
}

function getAllOrderDetailOfDesk(id, name) {
    $(".button-action").show();
    $(".menu-action").show();
    $("#deskName").text(name);
    $("#idTableChange").val(id);
    $.ajax({
        type: "GET",
        url: `/app/getAllOrderDetailOfDesk/${id}`,
    }).done(function (orderDetails){
        let content = "";

    if (orderDetails == undefined) {
            $("#listOrderOfDeskShow").html("");
        }else if (orderDetails.length > 0){
            for (let i = orderDetails.length-1; i >= 0; i--) {
                content += `
                       <div class="d-flex flex-row justify-content-between align-items-center mt-2 rounded">
                       
                            <div class="d-flex flex-row align-items-center col-6"><span class="font-weight-bold" style="text-align: left; margin-left: 5px">${orderDetails[i].product.productName}</span>
                            </div>
                            <div class="d-flex flex-row align-items-center  qty col-2"><i class="fas fa-minus-circle" style="color: darkgrey"></i>
                                <h6 class="text-grey mt-2 mr-1 ml-1">&nbsp; ${orderDetails[i].amount} &nbsp;</h6><i class="fas fa-plus-circle" style="color: #904201"></i>
                            </div>
                            <div class="d-flex flex-row align-items-center mt-2 text-right qty col-3">
                                <h6 style="text-align: right; width: 100%">${(orderDetails[i].productPrice)}</h6>
                            </div>
                            <a href="" class="mt-2 col-1"><i class="fa fa-trash mb-1 text-danger"></i></a>
                       </div>  
                `;
            }
            $("#listOrderOfDeskShow").html(content);
        }

    }).fail(function (){
        $("#listOrderOfDeskShow").html("");
    })
}


//----------Get All Category---------------------//
function getAllItemCategory(){
    $.ajax({
        type: "GET",
        url: "/app/allItemCategory"
    }).done(function (category){
        let content = "";
        for (let i = 0; i < category.length; i++) {
            content += `
                        <div class="category-title">
                            <p onclick="getProductByCategoryId(${category[i].categoryId})">${category[i].categoryName}</p>
                        </div>
                    `;
        }
        $("#deskDisplay").hide();
        $(".categories").show();
        $(".category-title").html(content);
        getAllProduct();
    })
}

function getAllProduct(){
    $.ajax({
        type: "GET",
        url: "/app/allItem"
    }).done(function (product){
        let content = "";
        for (let i = product.length-1; i >= 0; i--) {
            content += `
                        <div class="styleFrames" style="float: left" onclick="createOrderDetail(${product[i].productId},${product[i].price})" >
                            <input type="hidden" id="id_product" value="${product[i].productId}">
                            <div class="styleImage" >
                                <img src="/uploads/${product[i].image}" alt="${product[i].productName}">
                                <div class="overlay">                 
                                    <div class="text">${product[i].productName}</div>
                                     <div class="text mt-3"><small>${(product[i].price).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</small></div>  
                                    <button class="button-overlay" >Đặt món</button>
                                </div>
                            </div>
                        </div>
                `;
        }
        $(".food-information").show();
        $(".food-information").html(content);
    })
}

function getProductByCategoryId(categoryId){
    $.ajax({
        type: "GET",
        url: `/app/allProductByCategory/${categoryId}`,
        success: function (product){
            let content = "";
            for (let i = product.length-1; i >= 0; i--) {
                content += `
                        <div class="styleFrames" onclick="createOrderDetail(${product[i].productId},${product[i].price})">
                            <input type="hidden" id="id_product" value="${product[i].productId}">
                            <div class="styleImage" >
                                <img src="/uploads/${product[i].image}" alt="${product[i].productName}">
                                <div class="overlay">                 
                                    <div class="text">${product[i].productName}</div>
                                     <div class="text mt-3"><small>${(product[i].price).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</small></div>  
                                    <button class="button-overlay" >Đặt món</button>
                                </div>
                            </div>
                        </div>
                `;
            }
            $('.food-information').html(content);
        }
    })
}

function createOrderDetail(id,price) {
    let product_id = id;
    let product_price = price;
    let order_id = $('#id-order').val();

    let newOrder = {
        orderId: order_id,
    }

    let newProduct = {
        productId: product_id,
    }

    let newOrderDetail = {
        productPrice: product_price,
        order: newOrder,
        product: newProduct,
        amount: 0,
        status: true
    }


    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newOrderDetail),
        url: `/app/createOrderDetail`,
    }).done(function () {
        drawListOrderDetail(order_id);
    })
}

function drawListOrderDetail(id) {
    $.ajax({
        type: "GET",
        url: `/app/getOrderDetailByOrderID/${id}`,
    }).done(function (orderDetails){
        let content = ""
        if (orderDetails.length > 0){
            for (let i = orderDetails.length-1; i >= 0; i--) {
                content += `
                       <div class="sub__bill">
                            <div class="sub__bill--name">${orderDetails[i].product.productName}
                            </div>
                            <div class="sub__bill--quantity"><i class="fas fa-minus-circle" style="color: darkgrey"></i>
                                <h5 class="" style="margin: 0; font-size: .9rem">${orderDetails[i].amount}</h5><i class="fas fa-plus-circle" style="color: darkgrey"></i>
                            </div>
                            <div>
                                <h5 style="font-size: .8rem" class="sub__bill--price">${(orderDetails[i].productPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'}))}</h5>
                            </div>
                            <div title="Xóa món" class="sub__bill-delIcon"><i class="fa fa-trash mb-1 text-danger"></i></div>
                       </div>  
                `;
            }
            $(".bill-container").html(content);
        }
    }).fail(function (){
        $(".bill-container").html("");
    })
}

function menuQuickShow(){
    getAllItemCategory();
    $('#modalMenuQuick').modal('show');
}

//display --- application //
function showAppModal(){
    getAllDeskActivate();
    $('#appModal').modal('show');

}