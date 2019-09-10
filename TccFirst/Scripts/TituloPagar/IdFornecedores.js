$(function () {
    $("#modal-tituloPagar-fornecedor").select2({
        ajax: {
            url: "/fornecedor/obtertodosselect2",
            dataType: "json"
        }
    });
});