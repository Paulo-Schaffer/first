$(function () {
    $("#caixa-campo-historico").select2({
        ajax: {
            url: "/caixa/obtertodosselect2",
            dataType: "json"
        }
    });
});