$(function() {
    $("#login-campo-funcionario").select2({
        ajax: {
            url: "/funcionario/obtertodosselect2",
            dataType: "json"
        }
    });
});