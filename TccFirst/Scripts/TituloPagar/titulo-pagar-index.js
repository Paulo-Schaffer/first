$(function () {
    $idAlterar = -1;

    $tabelaTituloPagar = $("#titulo-pagar-tabela").DataTable({
        ajax: '/TituloPagar/obtertodos',
        severSide: true,
        columns: [
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
        $idApagar = $(this).data('id');
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
        $Descricao = $('#tituloPagar-campo-descricao').val();
        $FormaPagamento = $('#tituloPagar-campo-forma-pagamento').val();
        $Caixa = $('#tituloPagar-campo-caixa').val();
        $ValorTotal = $('#tituloPagar-campo-valor-total').val();
        $Status = $('#tituloPagar-campo-status').val();
        $DataLancamento = $('#tituloPagar-campo-data-lancamento').val();
        $DataRecebimento = $('#tituloPagar-campo-data-recebimento').val();
        $DataVencimento = $('#tituloPagar-campo-data-vencimento').val();
        $Complemento = $('#tituloPagar-campo-complemento').val();
        $QuantidadeParcela = $('#tituloPagar-campo-quantidade-parcela').val();
        $idFornecedores = $('#tituloPagar-campo-fornecedores').val();
        $idCategoriaDespesas = $("#tituloPagar-campo-categoria-despesas").val();

        if ($idAlterar == -1) {
            inserir($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela);
        } else {
            alterar($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela);
        }
    });

    function inserir($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela, $IdFornecedores, $IdCategoriaDespesas) {
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
                IdFornecedores: $IdFornecedores,
                IdCategoriaDespesas: $IdCategoriaDespesas
            },
            success: function (data) {
                $('#modal-tituloPagar').modal('hide');
                $(".modal-backdrop").hide();
                LimparCampos();
                $tabelaTituloPagar.ajax.reload();
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

    function alterar($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela, $IdFornecedores, $IdCategoriaDespesas) {
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
                IdFornecedores: $IdFornecedores,
                IdCategoriaDespesas: $IdCategoriaDespesas
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