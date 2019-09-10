$(function () {
    $("#modal-tituloPagar-categoria-despesa").select2({
        ajax: {
            url: "/categoriadespesa/obtertodosselect2",
            dataType: "json"
        }
    });
});