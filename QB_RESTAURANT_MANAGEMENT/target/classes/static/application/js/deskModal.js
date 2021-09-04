

function changeDesk() {
    let idDeskChange = $('#idTableChange').val();
    let idDeskNewChange = $('#tableNewChange').val();
    $.ajax({
        type: "PUT",
        data: { 'id1' : idDeskChange, 'id2' : idDeskNewChange },
        url: "/deskChange"
    }).done(function () {
        getAllDesk();
        $('#modalDeskChange').modal('hide');
        $('#modalQuickView').modal('hide');
        App.showSuccessAlert("Đổi bàn thành công!!");
    }).fail(()=>{
        App.showErrorAlert("Lỗi ! Không đổi được!!");
    })
}


function getToday(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
}


function showModalChange() {
    let deskId = $('#idTableChange').val();
    $.ajax({
        type: "GET",
        url: `/tableBook/${deskId}`,
        success: function (desk) {
            $('#tableChange').text(desk.deskName);
        }
    });
    $.ajax({
        type: "GET",
        url: "/deskChange"
    }).done(function (desks){
        let content = "";
        for (let i = 0; i < desks.length; i++) {
            content += `<option value="${desks[i].deskId}">${desks[i].deskName}</option>`;
        }
        $("#tableNewChange").html(content);
    });
    $('#modalDeskChange').modal('show');
}



