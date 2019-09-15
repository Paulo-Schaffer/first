
$(function () {
    $idAlterar = -1;
    $tabelaCaixa = $("#caixa-tabela").DataTable({
        ajax: '/Caixa/obtertodos',
        serverSide: true,
        columns: [
            { data: 'Descricao' },
            { data: 'Documento' },
            { data: 'FormaPagamento' },
            { data: 'Valor' },
            { data: 'DataLancamento' },
            { data: 'IdHistoricos'},
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar"data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar"data-id="' + row.Id + '">Apagar</button>'
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
        $IdHistoricos = $('#caixa-campo-historico').val();
        if ($idAlterar == -1) {
            inserir($descricao, $documento, $formaPagamento, $valor, $dataLancamento, $IdHistoricos);
        } else {
            alterar($descricao, $documento, $formaPagamento, $valor, $dataLancamento, $status, $IdHistoricos);
        }
    });

    function alterar($descricao, $documento, $formaPagamento, $valor, $dataLancamento, $IdHistoricos) {
        $.ajax({
            url: "/Caixa/update",
            method: "post",
            data: {
                Descricao: $descricao,
                Documento: $documento,
                FormaPagamento: $formaPagamento,
                Valor: $valor,
                DataLancamento: $dataLancamento,
                IdHistoricos: $IdHistoricos,
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

    function inserir($descricao, $documento, $formaPagamento, $valor, $dataLancamento, $IdHistoricos) {
        $.ajax({
            url: '/Caixa/inserir',
            method: 'post',
            data: {
                Descricao: $descricao,
                Documento: $documento,
                FormaPagamento: $formaPagamento,
                Valor: $valor,
                DataLancamento: $dataLancamento,
                IdHistoricos: $IdHistoricos,
            },
            success: function (data) {
                $('#modal-caixa').modal('hide');
                $(".modal-backdrop").hide();
                $tabelaCaixa.ajax.reload();
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
            url: '/caixa/obterpeloid?id=' + $id,
            method: 'get',
            success: function (data) {
                $idAlterar = $id;
                $('#caixa-campo-descricao').val(data.Descricao);
                $('#caixa-campo-documento').val(data.Documento);
                $('#caixa-campo-forma-pagamento').val(data.FormaPagamento);
                $('#caixa-campo-valor').val(data.Valor);
                $("#caixa-campo-data-lancamento").val(data.DataLancamneto);
                $('#caixa-campo-historico').val(data.IdHistoricos);
                $('#modal-caixa').modal('show');
            },
            error: function (err) {
                alert('Moisés');
            }
        });
    });
});