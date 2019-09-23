$(function () {

    $("#cadastro-conta-corrente-campo-Agencia").select2({
        ajax: {
            url: "/agencia/obtertodosselect2",
            dataType: "json"
        }
    });
});

$(function () {

    $("#cadastro-conta-corrente-campo-numero-conta").select2({
        ajax: {
            url: "/cadastrocontacorrente/obtertodosselect2",
            dataType: "json"
        }
    });
});