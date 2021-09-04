
//--------------Upload---------//
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

//--------------Upload---------//


function showEmployeeModal() {
    $('#employeeModal').modal('show')
}

//-------------Get All Position----------//
function getAllPosition(){
    $.ajax({
        type: "GET",
        url: "/allPosition"
    }).done(function (position){
        let content = "";
        for (let i = 0; i < position.length; i++) {
            content += `
                    <option value="${position[i].positionId}">${position[i].positionName}</option>
                `;
        }
        $("#position").html(content);
    })
}
getAllPosition();
//-------------Get All Position----------//

//-------------Get All Employee----------//
function getAllEmployee(){
    $.ajax({
        type: "GET",
        url: "/allEmployee"
    }).done(function (employee){
        let content = "";
        for (let i = employee.length-1; i >= 0; i--) {
            content += `
                        <tr id="row${employee[i].id}" class="text-center">
                              <input hidden id="${employee[i].id}">
                              <td>${employee[i].fullName}</td>
                              <td>${employee[i].phone}</td>
                              <td>${employee[i].address}</td>
                              <td>${employee[i].position.positionName}</td>
                              <td class="text-center">
                                <button value="${employee[i].id}" class="btn btn-outline-primary mr-2 edit-button" onclick="loadEditData(${employee[i].id})" ><i class="far fa-edit"></i>Sửa</button>
                                <button value="${employee[i].id}" class="btn btn-outline-danger delete-button" onclick="deleteEmployee(${employee[i].id})" ><i class="fas fa-trash-alt"></i>Xóa</button>
                              </td>
                        </tr>
                `;
        }
        $("#employeeList tbody").html(content);
        $("#employeeList").DataTable({
            columnDefs: [
                { orderable: false, targets: [4] },
                { searchable: false, targets: [4] }
            ],
        })
    })
}

getAllEmployee();
//-------------Get All Employee----------//


//-------------Create Employee-----------//
function createEmployee(){
    let employee_id = $('#employeeID').val();
    let employee_name = $("#employee_name").val();
    let phone = $("#phoneNumber").val();
    let user_name = $("#user_name").val();
    let password = $("#password").val();
    let DOB = $("#DOB").val();
    let address = $("#address").val();
    let position = $("#position").val();

    let newPosition = {
        positionId : position
    }

    let newEmployee = {
        id : employee_id,
        fullName : employee_name,
        phone : phone,
        username : user_name,
        position : newPosition,
        password : password,
        dob : DOB,
        address : address
    }
    
    if ($("#employeeForm").valid()){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(newEmployee),
            url: "/createEmployee"
        }).done(function (employee){
            $("#employeeForm")[0].reset();
            $("#employeeModal").modal('hide');
            App.showSuccessAlert("Tạo mới nhân viên thành công");
            // getAllEmployee();
            $('#employeeList tbody').prepend(' <tr id="row'+employee.id+'" class="text-center">\n' +
                ' <input hidden id="'+employee.id+'">\n' +
                ' <td>'+ employee.fullName + '</td>\n' +
                ' <td>'+ employee.phone + '</td>\n' +
                ' <td>'+ employee.address + '</td>\n' +
                ' <td>'+ employee.position.positionName + '</td>\n' +
                ' <td class="text-center">\n'+
                ' <button value="'+employee.id +'" class="btn btn-outline-primary mr-2 edit-button" ><i class="far fa-edit"></i>Sửa</button>\n' +
                ' <button value="'+employee.id +'" class="btn btn-outline-danger delete-button" onclick="deleteEmployee('+employee.id+')"><i class="fas fa-trash-alt"></i>Xóa</button>\n' +
                ' </td>\n' +
                ' </tr>');
        }).fail(()=>{
            App.showErrorAlert("Số điện thoại đã tồn tại!");
        })
    }
}
$("#create-button").on("click",createEmployee);
//-------------Create Employee-----------//

//-------------Delete Employee-----------//
function deleteEmployee(employeeID) {
    Swal.fire({
        title: 'Bạn muốn xóa?',
        text: "Sau khi xóa sẽ không phục hồi!",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#d33',
        denyButtonText :`Hủy`,
        confirmButtonText: 'Đồng ý!'
    }).then((result) => {
        if (result.isConfirmed){
            $.ajax({
                type : "DELETE",
                url : `/deleteEmployee/${employeeID}`,
                data : JSON.stringify(employeeID)
            }).done(function (){
                $("#row" + employeeID).remove();
                App.showSuccessAlert("Đã xóa thành công!")
            }).fail(function (){
                App.showErrorAlert("Đã xảy ra lỗi!")
            })
        }
    })
}
//-------------Delete Employee-----------//


function loadEditData(employeeID){
    $.ajax({
        type: 'GET',
        url: `/editEmployee/${employeeID}`,
        success: function (employee) {
            $('#up_employeeID').val(employee.id);
            $('#up_employee_name').val(employee.fullName);
            $('#up_position').val(employee.position.positionId).change();
            $('#up_phoneNumber').val(employee.phone);
            $('#up_user_name').val(employee.username);
            $('#up_password').val(employee.password);
            $('#up_DOB').val(employee.dob);
            $('#up_address').val(employee.address);
            $('#editEmployeeModal').modal('show');
        }
    })
}
function getEditPosition(){
    $.ajax({
        type: "GET",
        url: "/allPosition"
    }).done(function (position){
        let content = "";
        for (let i = 0; i < position.length; i++) {
            content += `
                    <option value="${position[i].positionId}">${position[i].positionName}</option>
                `;
        }
        $("#up_position").html(content);
    })
}

getEditPosition();

function saveEmployee() {
    let id_employee = $('#up_employeeID').val();
    let fullName = $('#up_employee_name').val();
    let position = $("#up_position").val();
    let phoneNumber = $('#up_phoneNumber').val();
    let userName = $('#up_user_name').val();
    let password = $('#up_password').val();
    let dob = $('#up_DOB').val();
    let address = $('#up_address').val();

    let newPosition = {
        positionId: position
    }

    let newEmployee = {
        fullName: fullName,
        phone: phoneNumber,
        dob: dob,
        password: password,
        username: userName,
        address: address,
        position: newPosition

    }
    if ($("#editEmployeeForm").valid()){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "PATCH",
            data: JSON.stringify(newEmployee),
            url: `/editEmployee`
        }).done(function (employee){
            $("#editEmployeeForm")[0].reset();
            App.showSuccessAlert("Đã cập nhật thành công!");
            $("#editEmployeeModal").modal('hide');
            $('#employeeList tbody').prepend(' <tr id="row'+employee.id+'" class="text-center">\n' +
                ' <input hidden id="'+employee.id+'">\n' +
                ' <td>'+ employee.fullName + '</td>\n' +
                ' <td>'+ employee.phone + '</td>\n' +
                ' <td>'+ employee.address + '</td>\n' +
                ' <td>'+ employee.position.positionName + '</td>\n' +
                ' <td class="text-center">\n'+
                ' <button value="'+employee.id +'" class="btn btn-outline-primary mr-2 edit-button" onclick="loadEditData('+employee.id+')" ><i class="far fa-edit"></i>Sửa</button>\n' +
                ' <button value="'+employee.id +'" class="btn btn-outline-danger delete-button" onclick="deleteEmployee('+employee.id+')"><i class="fas fa-trash-alt"></i>Xóa</button>\n' +
                ' </td>\n' +
                ' </tr>');
        }).fail (()=>{
            App.showErrorAlert("Đã xảy ra lỗi!");
        })
    }
}
$('#edit-button').on('click',saveEmployee);