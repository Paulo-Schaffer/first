$(function () {
    $("#parcelaReceber-campo-tituloReceber").select2({
        ajax: {
            url: "/tituloReceber/obtertodosselect2",
            dataType: "json"
        }
    });

});
   
