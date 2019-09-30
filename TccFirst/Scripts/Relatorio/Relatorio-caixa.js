(function () {

    $idAgencia = 0;

    $("#filtro-hisotirico").select2({
        ajax: {
            url: "/caixa/obtertodosselect2",
            dataType: "json"
        }
    }).on('change', function () {
        buscarValores();
        $('#relatorio-conta-caixa').DataTable().ajax.reload();
    });

    $("#filtro-valor").on("change", function () {
        buscarValores();
        $('#relatorio - conta - caixa').DataTable().ajax.reload();
    });
    $("filtro-documento").on("change", function () {
        buscarValores();
        $('#relatorio-conta-caixa').DataTable().ajax.reload();
    });



    function buscarValores() {
        $idAgencia = $("#filtro-agencia").val();
        $valor = $("#filtro-valor").val();
        $documento = $("#filtro-documento").val();
    }

    $tabelaCaixa = $('#relatorio-conta-caixa').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        ajax: {
            url: '/cadastrocontacorrente/obterTodos',
            data: function (d) {
                d.idAgencia = $idAgencia,
                    d.nome = $nome
            }
        },
        serverSide: true,
        columns: [
            //{ data: "Id" },
            { data: "Descricao" },
            { data: "Documento" },
            { data: "FormaPagamento" },
            { data: "Valor" },
            { data: "DataLancamento" },
            { data: "IdHistoricos" },


        ]
    });
});