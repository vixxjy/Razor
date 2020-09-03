var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/book", 
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        <div class="text-center">
                            <a href="/BookList/Upsert?id=${data}" class="btn btn-warning btn-sm text-white" style='cursor:pointer'; width:70px >Edit</a>
                            &nbsp;&nbsp;
                            <a class="btn btn-danger btn-sm text-white" style='cursor:pointer'; width:70px 
                            onclick=Delete('/api/book?id='+${data})>Delete</a>
                        </div>`;
                },
                "width": "40%"
            },
        ],
        "language": {
            "emptyTable": "No data found"
        },
        "width": "100%"
    })
}

function Delete(url) {
    swal({
        title: "Are you Sure?",
        text: "Once deleted, you wont be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type: "DELETE",
                    url: url,
                    success: function (data) {
                        if (data.success) {
                            toastr.success(data.message);
                            dataTable.ajax.reload();
                        }
                        else {
                            toastr.error(data.message);
                        }
                    }
                })
            }
        });
}