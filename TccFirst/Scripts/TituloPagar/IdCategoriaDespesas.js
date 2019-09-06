$(function () {
    $("#tituloPagar-categoria-despesas").select2({
        ajax: {
            url: "/categoriadespesa/obtertodosselect2",
            dataType: "json"
        }
    });
});