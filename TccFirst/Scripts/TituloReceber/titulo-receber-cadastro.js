$(function () {
    $("#tituloReceber-campo-pessoa-Juridica").select2({
        ajax: {
            url: "/clientePessoaJuridica/obtertodosselect2",
            dataType: "json"
        }
    });
    $("#tituloReceber-campo-pessoa-Fisica").select2({
        ajax: {
            url: "/clientepessoafisica/obtertodosselect2",
            dataType: "json"
        }
    });
    $("#tituloReceber-campo-categoria-Receita").select2({
        ajax: {
            url: "/categoriareceita/obtertodosselect2",
            dataType: "json"
        }
        
    });



});