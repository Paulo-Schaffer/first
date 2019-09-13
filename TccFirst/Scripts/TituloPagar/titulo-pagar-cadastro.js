$(function() {
    $("#tituloPagar-campo-fornecedor").select2({
        ajax: {
            url: "/fornecedor/obtertodosselect2",
            dataType:"json"
        }
    });

    $("#tituloPagar-campo-categoria-despesa").select2({
        ajax: {
            url: "/categoriadespesa/obtertodosselect2",
            dataType: "json"
        }
    });
});