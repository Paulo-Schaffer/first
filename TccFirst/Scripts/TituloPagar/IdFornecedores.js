$(function () {
    $("#tituloPagar-fornecedores").select2({
        ajax: {
            url: "/fornecedor/obtertodosselect2",
            dataType: "json"
        }
    });
});