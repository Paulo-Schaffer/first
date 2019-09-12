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
                    return "\
                    <button class='btn btn-primary botao-editar'\
                        data-id=" + row.Id + ">Editar</button>\
                    <button class='btn btn-danger botao-apagar'\
                        data-id=" + row.Id + ">Apagar</button>";
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
        $idFornecedor = $('#tituloPagar-campo-fornecedor').val();
        $idCategoriaDespesa = $("#tituloPagar-campo-categoria-despesa").val();
        $descricao = $('#tituloPagar-campo-descricao').val();
        $formaPagamento = $('#tituloPagar-campo-forma-pagamento').val();
        $caixa = $('#tituloPagar-campo-caixa').val();
        $valorTotal = $('#tituloPagar-campo-valor-total').val();
        $status = $('#tituloPagar-campo-status').val();
        $dataLancamento = $('#tituloPagar-campo-data-lancamento').val();
        $dataRecebimento = $('#tituloPagar-campo-data-recebimento').val();
        $dataVencimento = $('#tituloPagar-campo-data-vencimento').val();
        $complemento = $('#tituloPagar-campo-complemento').val();
        $quantidadeParcela = $('#tituloPagar-campo-quantidade-parcela').val();
        if ($idAlterar == -1) {
            inserir($idFornecedor, $idCategoriaDespesa, $descricao, $formaPagamento, $caixa, $valorTotal, $status, $dataLancamento, $dataRecebimento, $dataVencimento, $complemento, $quantidadeParcela);
        } else {
            alterar($idFornecedor, $idCategoriaDespesa, $descricao, $formaPagamento, $caixa, $valorTotal, $status, $dataLancamento, $dataRecebimento, $dataVencimento, $complemento, $quantidadeParcela);
        }
    });

    function inserir($idFornecedor, $idCategoriaDespesa, $descricao, $formaPagamento, $caixa, $valorTotal, $status, $dataLancamento, $dataRecebimento, $dataVencimento, $complemento, $quantidadeParcela) {
        $.ajax({
            url: '/titulopagar/cadastro',
            method: 'post',
            data: {
                idFornecedor: $idFornecedor,
                idCategoriaDespesa: $idCategoriaDespesa,
                descricao: $descricao,
                formaPagamento: $formaPagamento,
                caixa: $caixa,
                valorTotal: $valorTotal,
                status: $status,
                dataLancamento: $dataLancamento,
                dataRecebimento: $dataRecebimento,
                dataVencimento: $dataVencimento,
                complemento: $complemento,
                quantidadeParcela: $quantidadeParcela,
                idTituloPagar: $idTituloPagar
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
                $('#tituloPagar-campo-fornecedor').val(data.$IdFornecedor);
                $('#tituloPagar-campo-categoria-despesa').val(data.IdCategoriaDespesa);
                $('#tituloPagar-campo-descricao').val(data.Descricao);
                $('#tituloPagar-campo-forma-pagamento').val(data.FormaPagamento);
                $('#tituloPagar-campo-caixa').val(data.Caixa);
                $('#tituloPagar-campo-valor-total').val(data.ValorTotal);
                $('#tituloPagar-campo-status').val(data.Status);
                $('#tituloPagar-campo-data-lancamento').val(data.DataLancamento);
                $('#tituloPagar-campo-data-recebimento').val(data.DataRecebimento);
                $('#tituloPagar-campo-data-vencimento').val(data.DataVencimento);
                $('#tituloPagar-campo-complemento').val(data.Complemento);
                $('#tituloPagar-campo-quantidade-parcela').val(data.QuantidadeParcela);
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
                idFornecedor: $IdFornecedor,
                idCategoriaDespesa: $IdCategoriaDespesa,
                descricao: $Descricao,
                formaPagamento: $FormaPagamento,
                caixa: $Caixa,
                valorTotal: $ValorTotal,
                status: $Status,
                dataLancamento: $DataLancamento,
                dataRecebimento: $DataRecebimento,
                dataVencimento: $DataVencimento,
                complemento: $Complemento,
                quantidadeParcela: $QuantidadeParcela,
                id: $idAlterar,
                tituloPagar: $idTituloPagar,
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
        $('#tituloPagar-campo-fornecedor').val("");
        $('#tituloPagar-campo-categoria-despesa').val("");
        $('#tituloPagar-campo-descricao').val("");
        $('#tituloPagar-campo-forma-pagamento').val("");
        $('#tituloPagar-campo-caixa').val("");
        $('#tituloPagar-campo-valor-total').val("");
        $('#tituloPagar-campo-status').val("");
        $('#tituloPagar-campo-data-lancamento').val("");
        $('#tituloPagar-campo-data-recebimento').val("");
        $('#tituloPagar-campo-data-vencimento').val("");
        $('#tituloPagar-campo-complemento').val("");
        $('#tituloPagar-campo-quantidade-parcela').val("");
        $idAlterar = -1;
    }
});