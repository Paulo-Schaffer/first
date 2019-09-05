$(function () {
    $("#tituloPagar-categoria-despesas").select2({
        ajax: {
            url: "/categoriaDespesas/obtertodosselect2",
            dataType: "json"
        }
    });
});