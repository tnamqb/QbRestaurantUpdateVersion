function getAllDesk(){
    $.ajax({
        type: "GET",
        url: "/allDesk"
    }).done(function (desks){
        let content = "";
        for (let i = 0; i < desks.length; i++) {
            content += `
                        <tr id="row${desks[i].deskId}" class="text-center">
                              <input hidden id="${desks[i].deskId}">
                              <td>${desks[i].deskName}</td>
                              ${desks[i].custom ?
                              '<td style="color: darkred">Bàn đang có khách</td><td><button class="btn btn-warning" title="Tạm thời không thể đặt">Đã có khách</button></td>' :
                              `<td style="color: darkblue">Bàn đang trống</td>
                              ${!desks[i].hidden ?
                              `${desks[i].book != null && desks[i].book !== (null +"h "+ null) ?
                                `<td><a onclick="showBookDesk(${desks[i].deskId})" class="btn btn-danger">Đặt bàn ${desks[i].book}</a></td>` :
                                `<td><a onclick="showBookDesk(${desks[i].deskId})" class="btn btn-primary">Có thể đặt bàn</a></td>`}` :
                                '<td></td>'}`}
                              ${desks[i].hidden ?
                                `<td><a onclick="tableHidden(${desks[i].deskId})" class="btn btn-danger"><i class="fas fa-eye-slash fa-lg"></i></a></td>` :
                                `<td><a onclick="tableHidden(${desks[i].deskId})" class="btn btn-primary"><i class="fas fa-eye fa-lg"></i></a></td>`}                         
                              <td class="text-center">
                              ${!desks[i].hidden || desks[i].custom ?
                                '<button class="btn btn-outline-secondary delete-button" disabled style="text-decoration: line-through"><i class="fas fa-trash-alt"></i>Xóa</button>' :
                                `<button class="btn btn-outline-danger delete-button" onclick=deleteDesk(${desks[i].deskId})><i class="fas fa-trash-alt"></i>Xóa</button>`}
                              </td>
                        </tr>
                `;
        }
        $("#deskList tbody").html(content);
    })
}
getAllDesk();
function showModalDesk() {
    $('#deskModal').modal('show')
}
function showBookDesk(deskId) {
    $.ajax({
        type: "GET",
        //tên API
        url: `/tableBook/${deskId}`,
        //xử lý khi thành công
        success: function (desk) {
            $('#upTableId').val(desk.deskId);
            $('#nameTable').text(desk.deskName);
            $('#upTableCustom').val(desk.custom);
            $('#upTableHidden').val(desk.hidden);
            $('#upTableName').val(desk.deskName);
            let times = desk.book.split("h ");
            $('#upTimeBook').val(times[0]);
            $('#upMinuteBook').val(times[1]);

        }
    });
    $('#deskBook').modal('show');
}

$("#create-button").on("click",createDesk);

function createDesk(){
    let deskName = $("#deskName").val();

    let newDesk = {deskName: deskName}
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newDesk),
        url: "/createDesk"
    }).done(function (desk){
        $('#deskModal').modal('hide');
        $("#deskForm")[0].reset();
        App.showSuccessAlert("Thêm mới bàn ăn thành công!!");
        $('#deskList tbody').prepend(' <tr id="row'+desk.deskId+'" class="text-center">\n' +
            ' <input hidden id="'+desk.deskId+'">\n' +
            ' <td>'+ desk.deskName + '</td>\n' +
            (desk.custom ?
            ' <td>Bàn đang có khách</td>\n' :
            ' <td>Bàn đang trống</td>\n') +
            ' <td></td>\n' +
            (desk.hidden ?
            '<td><a onclick="tableHidden('+ desk.deskId +')" class="btn btn-danger"><i class="fas fa-eye-slash fa-lg"></i></a></td>' :
            '<td><a onclick="tableHidden('+ desk.deskId +')" class="btn btn-primary"><i class="fas fa-eye fa-lg"></i></a></td>') +
            ' <td class="text-center">\n'+
            ' <button class="btn btn-outline-danger delete-button" onclick="deleteDesk('+desk.deskId+')"><i class="fas fa-trash-alt"></i>Xóa</button>\n' +
            ' </td>\n' +
            ' </tr>');
    }).fail(()=>{
        App.showErrorAlert("Lỗi ! Tên bàn đã tồn tại!!");
    })
}

function deleteDesk(deskId) {
    Swal.fire({
        title: 'Bạn có chắc muốn xóa bàn?',
        text: "Bạn sẽ không thể hoàn nguyên điều này!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type : "DELETE",
                url : `/desk/${deskId}`
            }).done(function (){
                $("#row" + deskId).remove();
                App.showSuccessAlert("Đã xóa thành công!")
            }).fail(function (){
                App.showErrorAlert("Đã xảy ra lỗi!")
            })
        }
    })
}

function tableHidden(deskId) {
    $.ajax({
        type : "PUT",
        url : `/tableHidden/${deskId}`
    }).done(function (){
        getAllDesk();
        App.showSuccessAlert("Đã thay đổi thành công!")
    }).fail(function (){
        App.showErrorAlert("Đã xảy ra lỗi!")
    })
}

function tableBook() {
    let deskId = $("#upTableId").val();
    let deskName = $("#upTableName").val();
    let custom = $("#upTableCustom").val();
    let timeBook = ($("#upTimeBook").val() + "h " + $("#upMinuteBook").val());
    let deskHidden = $("#upTableHidden").val();
    let newDesk = {
        deskName : deskName,
        custom : custom,
        book : timeBook,
        hidden : deskHidden
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type : "PUT",
        data: JSON.stringify(newDesk),
        url : `/tableBook/${deskId}`
    }).done(function (){
        $('#deskBook').modal('hide');
        getAllDesk();
        App.showSuccessAlert("Đã đặt thành công!")
    }).fail(function (){
        App.showErrorAlert("Đã xảy ra lỗi!")
    });
}

function resetBook() {
    $('#upTimeBook').val(null);
    $('#upMinuteBook').val(null);
}

function getAllDeskDisplay(){
    $.ajax({
        type: "GET",
        url: "/allDesk"
    }).done(function (desks){
        let content = "";
        for (let i = 0; i < desks.length; i++) {
            content += `<div class="table-container" style="float: left; width: 20%; margin-bottom: 5%">
                            ${desks[i].hidden ?
                            '' :
                            `<div class="table-infor">
                                <div class="table-img" style="margin-left: 15%">
                                    <div class="table-name"><p style="color: darkblue">${desks[i].deskName}
                                    ${desks[i].book && desks[i].book !== (null +"h "+ null) ?
                                        `<span class="book" style="color: red"> (Đặt lúc ${desks[i].book})</span>` :
                                        ''}
                                    </p></div>
                                    ${desks[i].custom ?
                                        '<img src="/uploads/table/table1.jpg" style="width: 70%">' :
                                        '<img src="/uploads/table/table2.jpg" style="width: 70%">'}
                                </div>
                            </div>`}
                        </div>`
        }
        $("#showDisplay").html(content);
    });
}

getAllDeskDisplay();


