$(function () {
    $("#caixa-campo-historico").select2({
        ajax: {
            url:"/historico/obtertodosselect2",
            dataType: "json"
        }
    });
});