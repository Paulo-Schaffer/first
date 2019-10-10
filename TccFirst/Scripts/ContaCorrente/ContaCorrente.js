$(function () {
    $idAlterar = -1;
    $tabelaContaCorrente = $("#conta-corrente-tabela").DataTabble({
        ajax = '/ContaCorrente/obtertodos',
        serverSide = true,
        Columns: [
            { 'data': 'Id' },
            { 'data': 'NumeroConta' },
            { 'data': 'Descricao' },    
            { 'data': 'Documento' },
            { 'data': 'TipoReceitaDespesa' },
            { 'data': 'TipoPagamento' },
            { 'data': 'Valor' },
            { 'data': 'Status' },
            { 'data': 'DataLancamento' },
            { 'data': 'DataVencimento' },
            { 'data': 'DataRecebimento' },
            { 'data': 'NomeBanco' },
            { 'data': 'NumeroBanco' },
        ]
    })
});

$('#contaCorrente-botao-salvar').on('click', function () {
    $numeroConta = $('#contaCorrente-campo-numeroconta').val();
    $descricao = $('contaCorrente-campo-descricao').val();
    $documento = $('contaCorrente-campo-documento').val();
    $tipoReceitaDespesa = $('contaCorrente-campo-tiporeceitadespesa').val();
    $tipoPagamento = $('contaCorrente-campo-tipopagamento').val();
    $valor = $('contaCorrente-campo-valor').val();
    $status = $('contaCorrente-campo-status').val();
    $dataLancamento = $('contaCorrente-campo-datalancamento').val();
    $dataVencimento = $('contaCorrente-campo-datavencimento').val();
    $dataRecebimento = $('contaCorrente-campo-datarecebimento').val();
    $nomeBanco = $('contaCorrente-campo-nomebanco').val();
    $numeroBanco = $('contaCorrente-campo-numerobanco').val();
    if ($idAlterar == -1) {
        inserir($numeroConta, $descricao, $documento, $tipoReceitaDespesa, $tipoPagamento, $valor, $status, $dataLancamento, $dataVencimento, $dataRecebimento, $nomeBanco, $numeroBanco);
    } else {
        alterar($numeroConta, $descricao, $documento, $tipoReceitaDespesa, $tipoPagamento, $valor, $status, $dataLancamento, $dataVencimento, $dataRecebimento, $nomeBanco, $numeroBanco);
    }
});

function alterar($numeroConta, $documento, $tipoReceitaDespesa, $tipoPagamento, $valor, $status, $dataLancamento, $dataVencimento, $dataRecebimento, $nomeBanco, $numeroBanco) {
    $.ajax({
        url: "contaCorrente/update",
        method: "post",
        data: {
            id: $idAlterar,
            numeroconta: $numeroConta,
            descricao: $descricao,
            documento: $documento,
            tipoReceitaDespesa: $tipoReceitaDespesa,
            tipoPagamento: $tipoPagamento,
            valor: $valor,
            status: $status,
            dataLancamento: $dataLancamento,
            dataVencimento: $dataVencimento,
            dataRecebimento: $dataRecebimento,
            nomeBanco: $nomeBanco,
            numeroBanco: $numeroBanco
        },
        success: function (data) {
            $('#contaCorrente-tabela').modal("hide");
            $idAlterar = -1;
            $tabelaContaCorrente.ajax.Reload();
        },
        error: function (err) {
            alert("Não foi possivel Alterar");
        }
    })
}

function inserir($numeroConta, $documento, $tipoReceitaDespesa, $tipoPagamento, $valor, $status, $dataLancamento, $dataVencimento, $dataRecebimento, $nomeBanco, $numeroBanco) {
    $.ajax({
        url: '/contacorrente/inserir',
        method: 'post',
        data: {
            Numeroconta: $numeroConta,
            Descricao: $descricao,
            Documento: $documento,
            TipoReceitaDespesa: $tipoReceitaDespesa,
            TipoPagamento: $tipoPagamento,
            Valor: $valor,
            Status: $status,
            DataLancamento: $dataLancamento,
            DataVencimento: $dataVencimento,
            DataRecebimento: $dataRecebimento,
            NomeBanco: $nomeBanco,
            NumeroBanco: $numeroBanco
        },
        success: function (data) {
            $("#modal-clientePessoaFisica").modal("hide");
            $tabelaClientePessoaFisica.ajax.reload();
        },
        error: function (err) {
            alert("Não foi possível inserir");
        }

    });
}

$('.table').on('click', '.botao-apagar', function () {
    $idApagar = $(this).data('id');
    $.ajax({
        url: '/contacorrente/apagar?id=' + $idApagar,
        method: 'get',
        success: function (data) {
            $tabelaContaCorrente.ajax.reload();
        },
        error: function (err) {
            alert('Não foi possível apagar');
        }
    });
});

$('.table').on('click', '.botao-editar', function () {
    $idAlterar = $(this).data('id');
    $.ajax({
        url: '/contacorrente/obterpeloid?id=' + $idAlterar,
        method: 'get',
        success: function (data) {
            $('#contaCorrente-campo-numeroconta').val(data.Numeroconta);
            $('contaCorrente-campo-descricao').val(data.Descricao);
            $('contaCorrente-campo-documento').val(data.Documento);
            $('contaCorrente-campo-tiporeceitadespesa').val(data.TipoReceitaDespesa);
            $('contaCorrente-campo-tipopagamento').val(data.TipoPagamento);
            $('contaCorrente-campo-valor').val(data.Valor);
            $('contaCorrente-campo-status').val(data.Status);
            $('contaCorrente-campo-datalancamento').val(data.DataLancamento);
            $('contaCorrente-campo-datavencimento').val(data.DataVencimento);
            $('contaCorrente-campo-datarecebimento').val(data.DataRecebimento);
            $('contaCorrente-campo-nomebanco').val(data.NomeBanco);
            $('contaCorrente-campo-numerobanco').val(data.NumeroBanco);
        },
        error: function (err) {
            alert('não foi possível carregar');
        }
    });
});
