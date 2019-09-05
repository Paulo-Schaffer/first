$(function () {
    $("#tituloPagar-fornecedores").select2({
        ajax: {
            url: "/fornecedores/obtertodosselect2",
            dataType: "json"
        }
    });
});