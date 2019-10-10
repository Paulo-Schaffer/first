$(function () {
    $("#cadastro-conta-corrente-campo-idAgencia").select2({
        ajax: {
            url: "/agencia/obtertodosselect2",
            dataType: "json"
        }
    });
});
