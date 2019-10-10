$(function () {

    $dataInicial = "";
    $dataFinal = "";
    $idHistorico = 0;
    $valor = 0;
    $descricao = "";
    $controle = 0;

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
    $("#filtro-data-inicial").on("change", function (e) {
        buscarValores();
        if (e.keyCode === 13) {
        }
    });
    $("#filtro-data-final").on("change", function (e) {
        buscarValores();
        if (e.keyCode === 13) {
        }
    });

    function buscarValores() {
        $idHistorico = $("#filtro-historico").val();
        $valor = $("#filtro-valor").val();
        $descricao = $("#filtro-descricao").val();
        $dataInicial = $("#filtro-data-inicial").val();
        $dataFinal = $("#filtro-data-final").val();
        Tabela();
    }

    function Tabela() {
        if ($controle == 0) {

            $tabelaCaixa = $('#relatorio-conta-caixa').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ],
                ajax: {
                    url: '/caixa/obterTodosRelatorio',
                    data: function (d) {
                        d.idHistorico = $idHistorico,
                            d.valor = $valor,
                            d.descricao = $descricao,
                            d.dataInicial = $dataInicial,
                            d.dataFinal = $dataFinal
                    }
                },
                method: "GET",
                serverSide: true,
                columns: [
                    { data: "Descricao" },
                    { data: "Documento" },
                    {
                        render: function (data, type, row) {
                            return "R$ " + row.Valor
                        }
                    },
                    { data: "FormaPagamento" },
                    {
                        render: function (data, type, row) {
                            return moment(row.DataLancamento).format('DD/MM/YYYY')
                        }
                    },
                    { data: "Historico.Descricao" },
                ]
            });
            $controle = 1;
        } else {
            $tabelaCaixa.ajax.reload();
        }
    }
});
