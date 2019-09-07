$(function () {
    $("#tituloReceber-pessoaJuridica").select2({
        ajax: {
            url: "/clientePessoaJuridica/obtertodosselect2",
            dataType: "json"
        }
    });
    $("#tituloReceber-pessoaFisica").select2({
        ajax: {
            url: "/clientepessoafisica/obtertodosselect2",
            dataType: "json"
        }
    });
    $("#tituloReceber-categoria").select2({
        ajax: {
            url: "/categoria/obtertodosselect2",
            dataType: "json"
        }
    });


});