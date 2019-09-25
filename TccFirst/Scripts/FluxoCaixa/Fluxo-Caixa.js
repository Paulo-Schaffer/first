$(function () {

    $idAgencia = 0;

    $("#filtro-caixa").select2({
        ajax: {
            url: "/caixa/obtertodosselect2",
            dataType: "json"
        }
    }).on('change', function () {
        $idAgencia = $("#filtro-caixa").val();
        $('#fluxo-caixa-tabela').DataTable().ajax.reload();
    });

    $fluxoCaixa = $('#fluxo-caixa-tabela').DataTable({
        
        ajax: {
            url: '/cadastrocontacorrente/obterTodos',
            data: function (d) {
                d.idAgencia = $idAgencia
            }
        },
        serverSide: true,
        columns: [
            //{ data: "Id" },
            { data: "IdAgencia" },
            { data: "NumeroConta" }

        ]
    });


});
