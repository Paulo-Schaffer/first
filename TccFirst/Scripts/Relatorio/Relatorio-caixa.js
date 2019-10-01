(function () {

    $idHistorico= 0;

    $("#filtro-hisotirico").select2({
        ajax: {
            url: "/historico/obtertodosselect2",
            dataType: "json"
        }
    }).on('change', function () {
        buscarValores();
        $('#relatorio-conta-caixa').DataTable().ajax.reload();
    });

    //$("#filtro-valor").on("change", function () {
    //    buscarValores();
    //    $('#relatorio - conta - caixa').DataTable().ajax.reload();
    //});
    //$("filtro-documento").on("change", function () {
    //    buscarValores();
    //    $('#relatorio-conta-caixa').DataTable().ajax.reload();
    //});



    function buscarValores() {
        $idHistorico = $("#filtro-hisotirico").val();
        //$valor = $("#filtro-valor").val();
        //$documento = $("#filtro-documento").val();
    }

    $tabelaCaixa = $('#relatorio-conta-caixa').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        ajax: {
            url: '/caixa/obterTodos',
            data: function (d) {
                d.$idHistorico = $$idHistorico,
                    //d.$valor = $valor,
                    //d.$documento = $documento
            }
        },
        serverSide: true,
        columns: [
            { data: "Descricao" },
            //{ data: "Documento" },
            //{ data: "FormaPagamento" },
            //{ data: "Valor" },
            //{ data: "DataLancamento" },
            //{ data: "IdHistoricos" },


        ]
    });
});