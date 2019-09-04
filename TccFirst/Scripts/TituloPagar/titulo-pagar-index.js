$(function () {
    $idAlterar = -1;

    $tabelaTituloPagar = $("#titulo-pagar-tabela").DataTable({
        ajax: '/titulopagar/obtertodos',
        severSide: true,
        columns: [
            { 'data': 'Descricao' },
            { 'data': 'Forma de Pagamento' },
            { 'data': 'Caixa' },
            { 'data': 'Valor Total' },
            { 'data': 'Status' },
            { 'data': 'Data Lancamento' },
            { 'data': 'Data Pagamento' },
            { 'data': 'Data Vencimento' },
            { 'data': 'Complemento' },
            { 'data': 'Quantidade de Parcelas' },
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
            url: '/titulopagar/apagar?id=' + $idApagar,
            method: 'get',
            success: function (data) {
                $tabelatituloPagar.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possível apagar');
            }
        });
    });

    $('#tituloPagar-botao-salvar').on('click', function () {
        $Descricao = $('#tituloPagar-campo-descricao').val();
        $FormaPagamento = $('#tituloPagar-campo-formaPagamento').val();
        $Caixa = $('#tituloPagar-campo-caixa').val();
        $ValorTotal = $('#tituloPagar-campo-valorTotal').val();
        $Status = $('#tituloPagar-campo-status').val();
        $DataLancamento = $('#tituloPagar-campo-dataLancamento').val();
        $DataPagamento = $('#tituloPagar-campo-dataPagamento').val();
        $DataVencimento = $('#tituloPagar-campo-dataVencimento').val();
        $Complemento = $('#tituloPagar-campo-complemento').val();
        $QuantidadeParcelas = $('#tituloPagar-campo-quantidadePacelas').val();

        if ($idAlterar == -1) {
            inserir($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataPagamento, $DataVencimento, $Complemento, $QuantidadeParcelas);
        } else {
            alterar($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataPagamento, $DataVencimento, $Complemento, $QuantidadeParcelas);
        }
    });

    function inserir($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataPagamento, $DataVencimento, $Complemento, $QuantidadeParcelas) {
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
                DataPagamento: $DataPagamento,
                DataVencimento: $DataVencimento,
                Complemento: $Complemento,
                QuantidadeParcelas: $QuantidadeParcelas
            },
            success: function (data) {
                $('#modal-tituloPagar').modal('hide');
                $tabelaTituloPagar.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possível cadastrar');
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
                $('#tituloPagar-campo-formaPagamento').val(data.FormaPagamento);
                $('#tituloPagar-campo-caixa').val(data.Caixa);
                $('#tituloPagar-campo-valorTotal').val(data.ValorTotal);
                $('#tituloPagar-campo-status').val(data.Status);
                $('#tituloPagar-campo-dataLancamento').val(data.DataLancamento);
                $('#tituloPagar-campo-dataPagamento').val(data.DataPagamento);
                $('#tituloPagar-campo-dataVencimento').val(data.DataVencimento);
                $('#tituloPagar-campo-complemento').val(data.Complemento);
                $('#tituloPagar-campo-quantidadeParcelas').val(data.QuantidadeParcelas);
                $('#modal-tituloPagar').modal('show');
            },
            error: function (err) {
                alert("Não foi possível buscar o registro");
            }
        });
    });

    function alterar($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataPagamento, $DataVencimento, $Complemento, $QuantidadeParcelas) {
        $.ajax({
            url: '/tituloPagar/update',
            method: 'post',
            data: {
                id = $idAlterar,
                Descricao: $Descricao,
                FormaPagamento: $FormaPagamento,
                Caixa: $Caixa,
                ValorTotal: $ValorTotal,
                Status: $Status,
                DataLancamento: $DataLancamento,
                DataPagamento: $DataPagamento,
                DataVencimento: $DataVencimento,
                Complemento: $Complemento,
                QuantidadeParcelas: $QuantidadeParcelas,
            },
            success: function (data) {
                $('#modal-tituloPagar').modal('hide');
                $idAlterar = -1;
                $tabela.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possível alterar');
            }
        });
    }
});