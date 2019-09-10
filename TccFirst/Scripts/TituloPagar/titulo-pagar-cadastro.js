$(function() {
    $("#modal-tituloPagar-fornecedor").select2({
        ajax: {
            url: "fornecedor/obtertodosselect2",
            dataType:"json"
        }
    });

    $("#modal-tituloPagar-categoria-despesa").select2({
        ajax: {
            url: "categoriadespesa/obtertodosselect2",
            dataType: "json"
        }
    });
});