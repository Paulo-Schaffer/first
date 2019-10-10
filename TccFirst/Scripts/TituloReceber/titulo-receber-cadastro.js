$(function () {

    $("#tituloReceber-pessoa-fisica").hide();
    $("#tituloReceber-pessoa-juridica").hide();

    $("#tituloReceber-campo-pessoa-Juridica").select2({
        ajax: {
            url: "/clientePessoaJuridica/obtertodosselect2",
            dataType: "json"
        }
    });
    $("#tituloReceber-campo-pessoa-fisica").select2({
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

    $("#tituloReceber-campo-tipo-pessoa-fisica").on('click', function () {
        $("#tituloReceber-pessoa-fisica").show();
        $("#tituloReceber-pessoa-juridica").hide();
    });

    $("#tituloReceber-campo-tipo-pessoa-juridica").on('click', function () {
        $("#tituloReceber-pessoa-fisica").hide();
        $("#tituloReceber-pessoa-juridica").show();
    });
});