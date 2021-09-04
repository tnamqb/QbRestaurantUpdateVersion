let singleUploadForm = document.querySelector('#singleUploadForm');
let singleFileUploadInput = document.querySelector('#singleFileUploadInput');

function uploadSingleFile(file) {
    let formData = new FormData();
    formData.append("file", file);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/uploadFile");
    xhr.send(formData);
}

$("#singleUploadForm").on("submit",function (){
    let files = singleFileUploadInput.files;
    $("#imageName").val(files[0].name);
    uploadSingleFile(files[0]);
})


let upSingleFileUploadInput = document.querySelector('#up_singleFileUploadInput');

$("#up_singleUploadForm").on("submit",function (){
    let files = upSingleFileUploadInput.files;
    $("#up_imageName").val(files[0].name);
    editUploadSingleFile(files[0]);
})

function editUploadSingleFile(file) {
    let formData = new FormData();
    formData.append("fileEdit", file);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/uploadFileEdit");
    xhr.send(formData);
}

// --------Get All Category------//

function getAllCategory(){
    $.ajax({
        type: "GET",
        url: "/allCategory"
    }).done(function (category){
        let content = "";
        for (let i = 0; i < category.length; i++) {
            content += `
                    <option value="${category[i].categoryId}">${category[i].categoryName}</option>
                `;
        }
        $("#category").html(content);
    })
}

//----------Get all Category-----------//

// ---------Get all Product------------//

function getAllProduct(){
    $.ajax({
        type: "GET",
        url: "/allProduct"
    }).done(function (product){
        let content = "";
        for (let i = product.length-1; i >= 0; i--) {
            content += `
                        <tr id="row${product[i].productId}" class="text-center">
                              <input hidden id="${product[i].productId}">
                              <td>${product[i].productName}</td>
                              <td><img style="object-fit: cover"  width="100" height="100" src= "/uploads/${product[i].image}"  alt="${product[i].productName}"></td>
                              <td class='text-right'>${(product[i].price).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                              <td>${product[i].category.categoryName}</td>
                              <td class="text-center">
                                <button value="${product[i].productId}" class="btn btn-outline-primary mr-2 edit-button" onclick="loadEditData(${product[i].productId})" ><i class="far fa-edit"></i>Sửa</button>
                                <button value="${product[i].productId}" class="btn btn-outline-danger delete-button" onclick="deleteProduct(${product[i].productId})" ><i class="fas fa-trash-alt"></i>Ẩn</button>
                              </td>
                        </tr>
                `;
        }
        $("#productList tbody").html(content);
        $("#productList").DataTable({
            columnDefs: [
                { orderable: false, targets: [1,4] },
                { searchable: false, targets: [1,4] }
            ],
        })
    })
}

getAllProduct();

// ---------Get all Product------------//

// ---------Get all Hidden Product------------//

function getHiddenProduct(){
    $.ajax({
        type: "GET",
        url: "/allHiddenProduct"
    }).done(function (product){
        let content = "";
        for (let i = product.length-1; i >= 0; i--) {
            content += `
                        <tr id="row${product[i].productId}" class="text-center">
                              <input hidden id="${product[i].productId}">
                              <td>${product[i].productName}</td>
                              <td><img style="object-fit: cover"  width="100" height="100" src= "/uploads/${product[i].image}"  alt="${product[i].productName}"></td>
                              <td class='text-right'>${(product[i].price).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                              <td>${product[i].category.categoryName}</td>
                              <td class="text-center">
                                <button value="${product[i].productId}" class="btn btn-outline-danger delete-button" onclick="restoreProduct(${product[i].productId})" ><i class="fas fa-trash-restore"></i>Phục hồi</button>
                              </td>
                        </tr>
                `;
        }
        $("#hiddenProductList tbody").html(content);
        $("#hiddenProductList").DataTable({
            columnDefs: [
                { orderable: false, targets: [1,4] },
                { searchable: false, targets: [1,4] }
            ],
        })

    })
}

getHiddenProduct();

// ---------Get all Hidden Product------------//


function showModal() {
    $('#productModal').modal('show')
}

// ---------Create Product ----------------//

function createProduct(){
    let files = singleFileUploadInput.files;
    $("#imageName").val(files[0].name);
    uploadSingleFile(files[0]);

    let product_id = $('#productId').val();
    let product_name = $("#product_name").val();
    let image = $("#imageName").val();
    let price = $("#price").val();
    let status = $("#status").val();
    let category = $("#category").val();
    let description = $("#description").val();

    let newCategory = {
        categoryId : category
    }

    let newProduct = {
        productId : product_id,
        productName : product_name,
        image : image,
        status : status,
        price : price,
        category : newCategory,
        description : description
    }
    if ($("#create-form").valid()){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(newProduct),
            url: "/createProduct"
        }).done(function (product){
            $("#create-form")[0].reset();
            $("#productModal").modal('hide');
            $("#productList").dataTable().fnDestroy();
            getAllProduct();
            App.showSuccessAlert("Thêm mới sản phẩm thành công!!");
        }).fail(()=>{
            App.showErrorAlert("Tên sản phẩm đã tồn tại!");
        })
    }
}

$("#create-button").on("click",createProduct);

getAllCategory();

// ---------Create Product ----------------//

function showModalCategory() {
    $('#categoryModal').modal('show')
}

// ---------Create Category --------------//

function createCategory(){
    let categoryName = $("#category_name").val();

    let category = {
        categoryName: categoryName
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(category),
        url: "/createCategory",
        success: function () {
            App.showSuccessAlert("Thêm mới danh mục thành công!!");
            $("#categoryForm")[0].reset();
            $("#categoryModal").modal('hide');
            getAllProduct();
        }
    })
}

$(".create-category").on("click",createCategory);

// ---------Create Category --------------//


// ------------ Delete Product -----------//

function deleteProduct(productID) {
    Swal.fire({
        title: 'Bạn có muốn ẩn?',
        text: "Chuyển sản phẩm vào danh sách ẩn!",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#d33',
        denyButtonText :`Hủy`,
        confirmButtonText: 'Đồng ý!'
    }).then((result) => {
        if (result.isConfirmed){
            $.ajax({
                type : "PUT",
                url : `/deleteProduct/${productID}`,
                data : JSON.stringify(productID)
            }).done(function (){
                $("#row" + productID).remove();
                App.showSuccessAlert("Đã ẩn thành công!")
            }).fail(function (){
                App.showErrorAlert("Đã xảy ra lỗi!")
            })
        }
    })
}

// ------------ Delete Product -----------//


// Start function Edit Product() //

function uploadEditSingleFile(file) {
    let formData = new FormData();
    formData.append("file", file);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/uploadFile");
    xhr.send(formData);
}

function upImageEditSingleFile(file) {
    let formData = new FormData();
    formData.append("fileEdit", file);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/uploadFileEdit");
    xhr.send(formData);
}

//----------Load Edit Data------------//

function loadEditData(productID){
    $.ajax({
        type: 'GET',
        url: `/editProduct/${productID}`,
        success: function (product) {
            $('#up_productId').val(product.productId);
            $('#up_product_name').val(product.productName);
            $('#up_category').val(product.category.categoryId).change();
            $('#up_price').val(product.price);
            $('#up_status').val(product.status);
            $('#up_description').val(product.description);
            $('#image').attr("src","/uploads/"+product.image);
            $('#editProductModal').modal('show');
        }
    })
}

function getEditCategory(){
    $.ajax({
        type: "GET",
        url: "/allCategory"
    }).done(function (category){
        let content = "";
        for (let i = 0; i < category.length; i++) {
            content += `
                    <option value="${category[i].categoryId}">${category[i].categoryName}</option>
                `;
        }
        $("#up_category").html(content);
    })
}

getEditCategory();

//----------Load Edit Data------------//


//----------Restore Product-----------//

function restoreProduct(productID) {
    Swal.fire({
        title: 'Phục hồi?',
        text: "Bạn muốn khôi phục!",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#d33',
        denyButtonText :`Không`,
        confirmButtonText: 'Đồng ý!'
    }).then((result) => {
        if (result.isConfirmed){
            $.ajax({
                type : "PUT",
                url : `/restoreProduct/${productID}`,
                data : JSON.stringify(productID)
            }).done(function (){
                $("#row" + productID).remove();
                App.showSuccessAlert("Khôi phục thành công!")
            }).fail(function (){
                App.showErrorAlert("Đã xảy ra lỗi!")
            })
        }
    })
}

//----------Restore Product-----------//

    const image = document.getElementById("up_singleFileUploadInput");
    const previewContainer = document.getElementById("imagePreview");
    const previewImage = previewContainer.querySelector(".image-preview__image");
    const previewDefault = previewContainer.querySelector(".image-preview__default");
    previewImage.style.display = "none";

    image.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
    const reader = new FileReader();
    previewDefault.style.display = "none";
    previewImage.style.display = "block";

    reader.addEventListener("load", function () {
    previewImage.setAttribute("src", this.result);
});
    reader.readAsDataURL(file);
} else {
    previewDefault.style.display = "block";
    previewImage.style.display = "none";
    }
});

// ----------Save Product ----------//

function saveProduct(){
    let files = upSingleFileUploadInput.files;
    $("#up_imageName").val(files[0].name);
    upImageEditSingleFile(files[0]);

    let productId = $("#up_productId").val();
    let productName = $("#up_product_name").val();
    let price = $("#up_price").val();
    let status = $("#up_status").val();
    let image = $("#up_imageName").val();
    let category = $("#up_category").val();
    let description = $("#up_description").val();

    let newCategory = {
        categoryId : category
    }

    let newProduct = {
        productId : productId,
        productName : productName,
        price : price,
        status : status,
        image : image,
        description : description,
        category: newCategory
    }

    if ($("#edit-form").valid()){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "PATCH",
            data: JSON.stringify(newProduct),
            url: `/editProduct`
        }).done(function (){
            $("#edit-form")[0].reset();
            $("#editProductModal").modal('hide');
            App.showSuccessAlert("Đã cập nhật thành công!")
            $("#productList").dataTable().fnDestroy();
            getAllProduct()
        })
    }
}
$("#save-button").on("click",saveProduct);

// ----------Save Product ----------//



