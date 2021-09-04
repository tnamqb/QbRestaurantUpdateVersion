$("#create-form").validate({
        errorElement: 'div',
        rules: {
            product_name:  {
                required: true,
                minlength: 2,
                maxlength: 50,
            },
            price: {
                required: true,
                min: 1000,
                max: 10000000
            },
            description:{
                required:true
            },
        },

        messages: {
            product_name: {
                required: "Vui lòng nhập tên sản phẩm",
                minlength: "Vui lòng nhập tối thiểu 2 ký tự!",
                maxlength: "Vui lòng nhập tối đa chỉ có 50 ký tự!"
            },
            price: {
                required: "Vui lòng nhập giá!",
                min: "Nhỏ nhất là 1000 VND !!",
                max: "Lớn nhất là 10000000 !!"
            },
            description:{
                required:"Vui lòng nhập mô tả!"
            },
        },
        submitHandler: function() {
            createProduct();
        }
    });

$("#edit-form").validate({
        errorElement: 'div',
        rules: {
            up_product_name:  {
                required: true,
                minlength: 2,
                maxlength: 50,
            },
            up_price: {
                required: true,
                min: 1000,
                max: 1000000
            },
            up_description:{
                required:true
            },
        },

        messages: {
            up_product_name: {
                required: "Vui lòng nhập tên sản phẩm",
                minlength: "Vui lòng nhập tối thiểu 2 ký tự!",
                maxlength: "Vui lòng nhập tối đa chỉ có 50 ký tự!"
            },
            up_price: {
                required: "Vui lòng nhập giá!",
                min: "Nhỏ nhất là 1000 VND !!",
                max: "Lớn nhất là 1000000 !!"
            },
            up_description:{
                required:"Vui lòng nhập mô tả!"
            },
        },
        submitHandler: function() {
            saveProduct();
        }
});
