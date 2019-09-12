//$(function () {
//    $('#caixa-campo-cpf').mask('000.000.000,000', { reverse: true });
//});
$(function () {
    $idAlterar = -1;


    $tabelaCaixa = $("#caixa-tabela").DataTable({
        responsive : true,
        ajax: '/Caixa/obtertodos',
        severSide: true,
        columns: [
            //{ data: 'Id' },
            { data: 'Descricao' },
            { data: 'Documento' },
            { data: 'FormaPagamento' },
            { data: 'Valor' },
            { data: 'Historico' },
            {
                render: function (data, type, row) {
                    render: function (data, type, row) {
                        return '<button class="btn btn-primary botao-editar"data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar"data-id="' + row.Id + '">Apagar</button>'
                    }
                }
            }
        ]
    });
    $('#caixa-botao-salvar').on('click', function () {
        $descricao = $('#caixa-campo-descricao').val();
        $documento = $('#caixa-campo-documento').val();
        $formaPagamento = $('#caixa-campo-forma-pagamento').val();
        $valor = $('#caixa-campo-valor').val();
        $dataLancamento = $('#caixa-campo-data-lancamento').val();
        $historico = $('#caixa-campo-historico').val();
        if ($idAlterar == -1) {
            inserir($descricao, $documento, $formaPagamento, $valor, $dataLancamento, $status, $historico);
        } else {
            alterar($descricao, $documento, $formaPagamento, $valor, $dataLancamento, $status, $historico);
        }
    });

    function alterar($descricao, $documento, $formaPagamento, $valor, $dataLancamento, $status, $historico) {
        $.ajax({
            url: "/Caixa/update",
            method: "post",
            data: {
                id: $idAlterar,
                Descricao: $descricao,
                Documento: $documento,
                FormaPagamento: $formaPagamento,
                Valor: $valor,
                DataLancamento: $dataLancamento,
                Historico: $historico,
            },
            success: function (data) {
                $("#modal-caixa").modal("hide");
                $idAlterar = -1;
                $tabelaCaixa.ajax.reload();
            },
            error: function (err) {
                alert("Moisés");
            }
        })
    }

    function inserir($descricao, $documento, $formaPagamento, $valor, $dataLancamento, $status, $historico) {
        $.ajax({
            url: '/Caixa/inserir',
            method: 'post',
            data: {
                Descricao: $descricao,
                Documento: $documento,
                FormaPagamento: $formaPagamento,
                Valor: $valor,
                DataLancamento: $dataLancamento,
                Historico: $historico,
            },
            success: function (data) {
                $('#modal-caixa').modal('hide');
                $tabelaCaixa.ajax.reload();
                $('#modal-caixa').val("")
            },
            error: function (err) {

            }
        });
    }

    $('.table').on('click', '.botao-apagar', function () {
        $idApagar = $(this).data('id');

        $.ajax({
            url: '/Caixa/apagar?id=' + $idApagar,
            method: 'get',
            success: function (data) {
                $tabelaCaixa.ajax.reload();
            },

            error: function (err) {
                alert('Moisés');
            }

        });
    });

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');

        $.ajax({
            url: '/caixa/obterpeloid?id=' + $idAlterar,
            method: 'get',

            success: function (data) {
                $('#caixa-campo-descricao').val(data.Descricao);
                $('#caixa-campo-documento').val(data.Documento);
                $('#caixa-campo-forma-pagamento').val(data.FormaPagamento);
                $('#caixa-campo-valor').val(data.Valor);
               // var dataLancamento = moment(data.DataLancamento);
                //console.log();

                //$('#caixa-campo-data-lancamento').val(dataLancamento.format('YYYY-MM-DD'));
                $('#caixa-campo-historico').val(data.Historico);
                $('#modal-caixa').modal('show');
            },
            error: function (err) {
                alert('Moisés');
            }
        });
    });
});