$(function () {
    $idReceita = 0;
    $idDespesa = 0;
    $Documento = "";
    $controle = 0;


    $("#filtro-receita").select2({
        ajax: {
            url: "/categoriareceita/obtertodosselect2",
            dataType: "json"
        },
        placeholder: 'Todos',
        allowClear: true
    }).on('change', function () {
        buscarValores();
    });

    $("#filtro-despesa").select2({
        ajax: {
            url: "/categoriadespesa/obtertodosselect2",
            dataType: "json"
        },
        placeholder: 'Todos',
        allowClear: true
    }).on('change', function () {
        buscarValores();
    });

    $("#filtro-documento").on("keyup", function (e) {
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
        $idReceita = $("#filtro-receita").val()
        $idDespesa = $("#filtro-despesa").val();
        $Documento = $("#filtro-documento").val();
        $DataInicial = $("#filtro-data-inicial").val();
        $DataFinal = $("#filtro-data-final").val();
        Tabela();
        $('#relatorio-conta-transacao').DataTable().ajax.reload();
    }

    function Tabela() {
        if ($controle == 0) {
            $tabelaCaixa = $('#relatorio-conta-transacao').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ],
                responsive: true,
                ajax: {
                    url: '/transacao/ObterTodosRelatorio',
                    data: function (d) {
                        d.idReceita = $idReceita;
                        d.idDespesa = $idDespesa;
                        d.documento = $Documento;
                    }
                },
                serverSide: true,
                columns: [
                    { data: "DescricaoTransacao" },
                    { data: "Documento" },
                    { data: "TipoPagamento" },
                    { data: "Valor" },
                    {
                        render: function (data, type, row) {
                            return moment(row.DataLancamento).format('DD/MM/YYYY')
                        }
                    },
                    {
                        render: function (data, type, row) {
                            return moment(row.DataLancamento).format('DD/MM/YYYY')
                        }
                    },
                    { data: "CategoriaDespesa.TipoCategoriaDespesa" },
                    { data: "CategoriaReceita.TipoCategoriaReceita" },
                ]
            });
            $controle = 1;
        } else {
            $tabelaCaixa.ajax.reload();
        }
    }

});
