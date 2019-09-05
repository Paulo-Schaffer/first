$(function () {
    $("#tituloPagar-categoria-despesas").select2({
        ajax: {
            url: "/categoriadespesa/obtertodospeloselect2",
            dataType: "json"
        }
    });
});