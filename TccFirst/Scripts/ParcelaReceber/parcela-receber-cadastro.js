$(function () {
    $("#parcelasReceber-campo-tituloReceber").select2({
        ajax: {
            url: "/TituloReceber/obtertodosselect2",
            dataType: "json"
        }
    });

});
   
