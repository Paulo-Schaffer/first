$(function () {

    $idAgencia = 0;

    $("#filtro-agencia").select2({
        ajax: {
            url: "/agencia/obtertodosselect2",
            dataType: "json"
        }
    }).on('change', function () {
        $idAgencia = $("#filtro-agencia").val();
        $('#relatorio-conta-corrente-tabela').DataTable().ajax.reload();
    });

    $tabelaCadastroContaCorrente = $('#relatorio-conta-corrente-tabela').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        ajax: {
            url: '/cadastrocontacorrente/obterTodos',
            data: function (d) {
                d.idAgencia = $idAgencia
            }
        },
        serverSide: true,
        columns: [
            { data: "IdAgencia" },
            { data: "NumeroConta" }
        ]
    });
});