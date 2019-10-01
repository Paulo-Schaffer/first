$(function () {

    $idHistorico = 0;
    $valor = 0;
    $descricao = "";

    $("#filtro-historico").select2({
        ajax: {
            url: "/historico/obtertodosselect2",
            dataType: "json"
        }
    }).on('change', function () {
        buscarValores();
    });

    $("#filtro-valor").on("keyup", function (e) {
        if (e.keyCode === 13) {

        buscarValores();
        }

    });
    $("#filtro-descricao").on("keyup", function (e) {
        if (e.keyCode === 13) {

            buscarValores();
        }
    });
});


    function buscarValores() {
        $idHistorico = $("#filtro-historico").val();
        $valor = $("#filtro-valor").val();
        $descricao = $("#filtro-descricao").val();
        $('#relatorio-conta-caixa').DataTable().ajax.reload();
    }

    $tabelaCaixa = $('#relatorio-conta-caixa').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        ajax: {
            url: '/caixa/obterTodosRelatorio',
            data: function (d) {
                d.idHistorico = $idHistorico;
                d.valor = $valor;
                d.descricao = $descricao;
            }
        },
        serverSide: true,
        columns: [
            { data: "Descricao" },
            { data: "Documento" },
            { data: "Valor" },
            { data: "FormaPagamento" },
            { data: "DataLancamento" },
            { data: "IdHistoricos" },


        ]
    });
