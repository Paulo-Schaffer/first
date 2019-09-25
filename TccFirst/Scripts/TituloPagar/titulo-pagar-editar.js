$(function () {
    $idAlterar = -1;

    $tabelaTituloPagar = $("#tituloPagar-tabela").DataTable({
        "scrollX": true,
        ajax: '/titulopagar/obtertodos',
        serverSide: true,
        columns: [
            { data: "Id" },
            { data: "Fornecedor.RazaoSocial" },
            { data: "CategoriaDespesa.TipoCategoriaDespesa" },
            { data: "Descricao" },
            { data: "FormaPagamento" },
            { data: "Caixa" },
            { data: "ValorTotal" },
            { data: "Status" },
            {
            render: function (data, type, row) {
            return moment(row.DataNascimento).format('YYYY-MM-DD')
                }
            },
            {
                render: function (data, type, row) {
                    return moment(row.DataRecebimento).format('YYYY-MM-DD')
                }
            },
            {
                render: function (data, type, row) {
                    return moment(row.DataVencimento).format('YYYY-MM-DD')
                }
            },

            { data: "Complemento" },
            { data: "QuantidadeParcela" },
            {
                render: function (data, type, row) {
                    return "\
                    <button class='btn btn-primary botao-editar fa fa-edit'\
                        data-id=" + row.Id + "> Editar</button>\
                    <button class='btn btn-danger botao-apagar fa fa-trash'\
                        data-id=" + row.Id + "> Apagar</button>";
                }
            }
        ]
    });

    $('#titulo-pagar-botao-salvar').on('click', function () {
        $IdFornecedor = $('#tituloPagar-campo-fornecedor').val();
        $IdCategoriaDespesa = $("#tituloPagar-campo-categoria-despesa").val();
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
        
        if ($idAlterar == -1) {
            inserir($IdFornecedor, $IdCategoriaDespesa, $Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela);
        } else {
            alterar($IdFornecedor, $IdCategoriaDespesa, $Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela);
        }
    });

    $("#tituloPagar-tabela").on('click', '.botao-apagar', function () {
        confirma = confirm("Deseja realmente apagar?");
        if (confirma == true) {
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
        }
    });

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data("id");
        $.ajax({
            url: '/titulopagar/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
                    $('#tituloPagar-campo-fornecedor').val(data.IdFornecedor);
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
            error: function (data) {
                alert("Não foi possível buscar o registro");
            }
        });
    });

    function inserir($IdFornecedor, $IdCategoriaDespesa, $Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela) {
        $.ajax({
            url: '/titulopagar/cadastro',
            method: 'post',
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
            },
            success: function (data) {
                LimparCampos();
                $('#modal-tituloPagar').modal('hide');
                $tabelaTituloPagar.ajax.reload();
            },
            error: function (err) {
                
            }
        });
    }

    function alterar($IdFornecedor, $IdCategoriaDespesa, $Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Complemento, $QuantidadeParcela) {
        $.ajax({
            url: '/titulopagar/editar',
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

    $('#modal-tituloPagar').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })
});