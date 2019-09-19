
$(function () {
    $idAlterar = -1;
    $tabelaCaixa = $("#caixa-tabela").DataTable({
        ajax: '/Caixa/obtertodos',
        serverSide: true,
        columns: [
            { data: 'Descricao' },
            { data: 'Documento' },
            { data: 'Valor' },
            { data: 'FormaPagamento'},
            {
                render: function(data, type, row) {
                    return moment(row.DataLancamento).format('DD/MM/YYYY')
                }
            },
            { data: 'Historico.Descricao'},
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar"data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar"data-id="' + row.Id + '">Apagar</button>'

                }
            }
        ]
        
    });
    $('#caixa-botao-salvar').on('click', function () {
        if ($('#caixa-campo-descricao').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Descrição </div>');
            $('#caixa-campo-nome').focus();
            return false;

        } else if ($('#caixa-campo-documento').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Documento </div>');
            $('#caixa-campo-documento').focus();
            return false;
        } else if ($('#caixa-campo-valor').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Valor </div>');
            $('#caixa-campo-valor').focus();
            return false;
        } else if ($('#caixa-campo-forma-pagamento').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Selecione a forme de Pagamento</div>');
            $('#caixa-campo-forma-pagamento').focus();
            return false;
        } else if ($('#caixa-campo-data-lancamento').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Selecione a Data de Lançamento </div>');
            $('#caixa-campo-data-lancamento').focus();
            return false;
        } else if ($('#caixa-campo-historico').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Selecione o Historico </div>');
            $('#caixa-campo-historico').focus();
            return false;
        }

        $descricao = $('#caixa-campo-descricao').val();
        $documento = $('#caixa-campo-documento').val();
        $formaPagamento = $('#caixa-campo-forma-pagamento').val();
        $valor = $('#caixa-campo-valor').val();
        $dataLancamento = $('#caixa-campo-data-lancamento').val();
        $IdHistoricos = $('#caixa-campo-historico').val();
        if ($idAlterar == -1) {
            inserir($descricao, $documento, $formaPagamento, $valor, $dataLancamento, $IdHistoricos);
        } else {
            alterar($descricao, $documento, $formaPagamento, $valor, $dataLancamento, $IdHistoricos);
        }
    });

    function alterar($descricao, $documento, $formaPagamento, $valor, $dataLancamento, $IdHistoricos) {
        $.ajax({
            url: "/Caixa/update",
            method: "post",
            data: {
                id: $idAlterar,
                Descricao: $descricao,
                Documento: $documento,
                Valor: $valor,
                FormaPagamento: $formaPagamento,
                DataLancamento: $dataLancamento,
                IdHistoricos: $IdHistoricos,
            },
            success: function (data) {
                $("#modal-caixa").modal("hide");
                LimparCampos();
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
                Valor: $valor,
                FormaPagamento: $formaPagamento,
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
            url: '/caixa/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
                $('#caixa-campo-descricao').val(data.Descricao);
                $('#caixa-campo-documento').val(data.Documento);
                $('#caixa-campo-valor').val(data.Valor);
                $('#caixa-campo-forma-pagamento').val(data.FormaPagamento);

                $("#caixa-campo-data-lancamento").val(data.DataLancamento);
                $('#caixa-campo-historico').val(data.IdHistoricos);
                $('#modal-caixa').modal('show');
            },
            error: function (err) {
                alert('Moisés');
            }
        });
    });

    function LimparCampos() {
        $("#tituloReceber-campo-pessoa-Juridica").val("");
        $("#tituloReceber-campo-categoria-Receita").val("");
        $("#tituloReceber-campo-status").val("");
        $("#tituloReceber-campo-valor-total").val("");
        $("#tituloReceber-campo-quantidade-Parcelas").val("");
        $("#tituloReceber-campo-descricao").val("");
        $("#tituloReceber-campo-data-lancamento").val("");
        $("#tituloReceber-campo-data-recebimento").val("");
        $("#tituloReceber-campo-data-vencimento").val("");
        $idAlterar = -1;
    }
    $('#modal-tituloReceber').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })
});