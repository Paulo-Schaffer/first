$(function () {
    $idReceita = 0;
    $idDespesa = 0;
    $Documento = "";

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
        }
    }).on('change', function () {
        buscarValores();
    });

    $("#filtro-documento").on("keyup", function (e) {
        if (e.keyCode === 13) {

            buscarValores();
        }
    });

    $("#filtro-data-inicial").on("keyup", function (e) {
        if (e.keyCode === 13) {

            buscarValores();
        }
    });

    $("#filtro-data-final").on("keyup", function (e) {
        if (e.keyCode === 13) {

            buscarValores();
        }
    });

    function buscarValores() {
        $idReceita = $("#filtro-receita").val() == null ? 0 : $("#filtro-receita").val();
        $idDespesa = $("#filtro-despesa").val();
        $Documento = $("#filtro-documento").val();
        $DataInicial = $("#filtro-data-inicial").val();
        $DataFinal = $("#filtro-data-final").val();
        $('#relatorio-conta-transacao').DataTable().ajax.reload();
    }

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
            { data: "DataLancamento" },
            { data: "DataRecebimento" },
            { data: "IdCategoriaDespesa" },
            { data: "IdCategoriaReceita" },
        ]
    });
});