$(function () {
    $IdFornecedor = $("#id").val();
    $IdCategoriaDespesa = $("#id").val();
    $idAlterar = -1;
    $IdFornecedor = $("#id").val();
    $IdCategoriaDespesa = $("#id").val();

    $tabelaTituloPagar = $("#titulo-pagar-tabela").DataTable({
        ajax: '/TituloPagar/obtertodos',
        severSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'Descricao' },
            { 'data': 'Forma de Pagamento' },
            { 'data': 'Caixa' },
            { 'data': 'Valor Total' },
            { 'data': 'Status' },
            { 'data': 'Data Lancamento' },
            { 'data': 'Data Recebimento' },
            { 'data': 'Data Vencimento' },
            { 'data': 'Complemento' },
            { 'data': 'Quantidade de Parcela' },
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

    $('.table').on('click', '.botao-apagar', function () {
        $id = $(this).data('id');
        $.ajax({
            url: '/tituloPagar/apagar?id=' + $idApagar,
            method: 'get',
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
        
        if ($idAlterar == -1) {
            inserir($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela);
        } else {
            alterar($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela);
        }
    });

    function inserir($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela) {
        $.ajax({
            url: '/tituloPagar/inserir',
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
                IdCategoriaDespesa: $IdCategoriaDespesa
            },
            success: function (data) {
                LimparCampos();
                $tabelaTituloPagar.ajax.reload();
                $('#modal-tituloPagar').modal('hide');
            },
            error: function (err) {
                alert('Não foi possível cadastrar!');
            }
        });
    }


    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data("id");
        $.ajax({
            url: '/tituloPagar/obterpeloid?id=' + $idAlterar,
            method: "get",
            success: function (data) {
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

    function alterar($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela) {
        $.ajax({
            url: '/tituloPagar/update',
            method: 'post',
            data: {
                id: $idAlterar,
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
                IdCategoriaDespesa: $IdCategoriaDespesa
            },
            success: function (data) {
                $('#modal-tituloPagar').modal('hide');
                $idAlterar = -1;
                LimparCampos();
                $tabelaTituloPagar.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possível alterar');
            }
        });

        function LimparCampos() {
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
    }
});