$(function () {

    $dataInicial = "";
    $dataFinal = "";
    $idReceita = 0;
    $valor = 0;
    $descricao = "";


    $controle = 0;

    $("#filtro-receita").select2({
        ajax: {
            url: "/tituloReceber/obtertodosselect2",
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
        $idReceita = $("#filtro-receita").val();
        $valor = $("#filtro-valor").val();
        $descricao = $("#filtro-descricao").val();
        $dataInicial = $("#filtro-data-inicial").val();
        $dataFinal = $("#filtro-data-final").val();
        Tabela();
    }

    function Tabela() {
        if ($controle == 0) {

            $tabelaTitulo = $('#relatorio-titulo-receber').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ],
                ajax: {
                    url: '/tituloReceber/obterTodosRelatorio',
                    data: function (d) {
                        d.receita = $idReceita,
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
                    { data: "ValorTotal" },
                    {
                        render: function (data, type, row) {
                            return moment(row.DataLancamento).format('DD/MM/YYYY')
                        }
                    },
                    { data: "CategoriaReceita.TipoCategoriaReceita" },


                ]
            });
            $controle = 1;
        } else {
            $tabelaTitulo.ajax.reload();
        }
    }
});