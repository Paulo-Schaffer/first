$(function () {

    $idAgencia = 0;

    $("#filtro-agencia").select2({
        ajax: {
            url: "/agencia/obtertodosselect2",
            dataType: "json"
        }
    }).on('change', function () {
        buscarValores();
        $('#relatorio-conta-corrente-tabela').DataTable().ajax.reload();
    });

    //$("#filtr-nome").on("change", function () {
    //    buscarValores();
    //    $('#relatorio-conta-corrente-tabela').DataTable().ajax.reload();
    //});

    function buscarValores() {
        $idAgencia = $("#filtro-agencia").val();
        //$nome = $("#filtr-nome").val();
    }

    $tabelaCadastroContaCorrente = $('#relatorio-conta-corrente-tabela').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        ajax: {
            url: '/cadastrocontacorrente/obterTodos',
            data: function (d) {
                d.idAgencia = $idAgencia
                    //d.nome = $nome
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