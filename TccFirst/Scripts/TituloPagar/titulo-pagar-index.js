$(function () {
    $idTituloPagar = $("#id").val();
    $idAlterar = -1;

    $tabelaTituloPagar = $("#tituloPagar-tabela").DataTable({
        ajax: '/titulopagar/obtertodos',
        serverSide: true,
        columns: [
            { data: "IdFornecedor" },
            { data: "IdCategoriaDespesa" },
            { data: "Descricao" },
            { data: "FormaDePagamento" },
            { data: "Caixa" },
            { data: "ValorTotal" },
            { data: "Status" },
            { data: "DataLancamento" },
            { data: "DataRecebimento" },
            { data: "DataVencimento" },
            { data: "Complemento" },
            { data: "QuantidadeDeParcela" },
            {
                render: function (data, type, row) {
                    return "";
                }
            }
        ]
    });

    $("#tituloPagar-tabela").on('click', '.botao-apagar', function () {
        $id = $(this).data('id');
        $.ajax({
            url: '/titulopagar/apagar?id=' + $id,
            method: "get",
            success: function (data) {
                $tabelaTituloPagar.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possível apagar');
            }
        });
    });

    $('#titulo-pagar-botao-salvar').on('click', function () {
        $Descricao = $('#modal-tituloPagar-descricao').val();
        $FormaPagamento = $('#modal-tituloPagar-forma-pagamento').val();
        $Caixa = $('#modal-tituloPagar-caixa').val();
        $ValorTotal = $('#modal-tituloPagar-valor-total').val();
        $Status = $('#modal-tituloPagar-status').val();
        $DataLancamento = $('#modal-tituloPagar-data-lancamento').val();
        $DataRecebimento = $('#modal-tituloPagar-data-recebimento').val();
        $DataVencimento = $('#modal-tituloPagar-data-vencimento').val();
        $Complemento = $('#modal-tituloPagar-complemento').val();
        $QuantidadeParcela = $('#modal-tituloPagar-quantidade-parcela').val();
        $IdFornecedor = $('#modal-tituloPagar-fornecedor').val();
        $IdCategoriaDespesa = $("#modal-tituloPagar-categoria-despesa").val();
        debugger;
        if ($idAlterar == -1) {
            inserir($IdFornecedor, $IdCategoriaDespesa, $Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela);
        } else {
            alterar($IdFornecedor, $IdCategoriaDespesa, $Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela);
        }
    });

    function inserir($IdFornecedor, $IdCategoriaDespesa, $Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela) {
        $.ajax({
            url: '/titulopagar/cadastro',
            method: 'post',
            data: {
                Descricao: $Descricao,
                FormaPagamento: $FormaPagamento,
                Caixa: $Caixa,
                ValorTotal: $ValorTotal,
                Status: $Status,
                DataLancamento: $DataLancamento,
                DataRecebimento: $DataRecebimento,
                DataVencimento: $DataVencimento,
                Complemento: $Complemento,
                QuantidadeParcela: $QuantidadeParcela,
                IdFornecedor: $IdFornecedor,
                IdCategoriaDespesa: $IdCategoriaDespesa,
                IdTituloPagar: $idTituloPagar
            },
            success: function (data) {
                $('#modal-tituloPagar').modal('hide');
                LimparCampos();
                $tabelaTituloPagar.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possível cadastrar!');
            }
        });
    }

    $("#modal-tiuloPagar").on('click', '.botao-editar', function () {
        $id = $(this).data("id");
        $.ajax({
            url: '/titulopagar/obterpeloid?id=' + $id,
            method: "get",
            success: function (data) {
                $idAlterar = $id;
                $('#modal-tituloPagar-fornecedor').val(data.$IdFornecedor);
                $('#modal-tituloPagar-categoria-despesa').val(data.IdCategoriaDespesa);
                $('#modal-tituloPagar-descricao').val(data.Descricao);
                $('#modal-tituloPagar-forma-pagamento').val(data.FormaPagamento);
                $('#modal-tituloPagar-caixa').val(data.Caixa);
                $('#modal-tituloPagar-valor-total').val(data.ValorTotal);
                $('#modal-tituloPagar-status').val(data.Status);
                $('#modal-tituloPagar-data-lancamento').val(data.DataLancamento);
                $('#modal-tituloPagar-data-recebimento').val(data.DataRecebimento);
                $('#modal-tituloPagar-data-vencimento').val(data.DataVencimento);
                $('#modal-tituloPagar-complemento').val(data.Complemento);
                $('#modal-tituloPagar-quantidade-parcela').val(data.QuantidadeParcela);
                $('#modal-tituloPagar').modal('show');
            },
            error: function (err) {
                alert("Não foi possível buscar o registro");
            }
        });
    });

    function alterar($IdFornecedor, $IdCategoriaDespesa, $Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela) {
        $.ajax({
            url: '/titulopagar/alterar',
            method: "post",
            data: {
                IdFornecedor: $IdFornecedor,
                IdCategoriaDespesa: $IdCategoriaDespesa,
                Descricao: $Descricao,
                FormaPagamento: $FormaPagamento,
                Caixa: $Caixa,
                ValorTotal: $ValorTotal,
                Status: $Status,
                DataLancamento: $DataLancamento,
                DataRecebimento: $DataRecebimento,
                DataVencimento: $DataVencimento,
                Complemento: $Complemento,
                QuantidadeParcela: $QuantidadeParcela,
                TituloPagar: $idTituloPagar,
                id: $idAlterar,
            },
            success: function (data) {
                $('#modal-tituloPagar').modal('hide');
                LimparCampos();
                $tabelaTituloPagar.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possível alterar');
            }
        });

    }

    function LimparCampos() {
        $('#modal-tituloPagar-fornecedor').val("");
        $('#modal-tituloPagar-categoria-despesa').val("");
        $('#modal-tituloPagar-descricao').val("");
        $('#modal-tituloPagar-forma-pagamento').val("");
        $('#modal-tituloPagar-caixa').val("");
        $('#modal-tituloPagar-valor-total').val("");
        $('#modal-tituloPagar-status').val("");
        $('#modal-tituloPagar-data-lancamento').val("");
        $('#modal-tituloPagar-data-recebimento').val("");
        $('#modal-tituloPagar-data-vencimento').val("");
        $('#modal-tituloPagar-complemento').val("");
        $('#modal-tituloPagar-quantidade-parcela').val("");
        $idAlterar = -1;
    }
});