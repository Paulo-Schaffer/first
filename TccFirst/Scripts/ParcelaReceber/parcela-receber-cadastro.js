$(function () {
    $("#parcelaReceber-campo-titulo-Receber").select2({
        ajax: {
            url: "/TituloReceber/obtertodosselect2",
            dataType: "json"
        }
    });

});
   
