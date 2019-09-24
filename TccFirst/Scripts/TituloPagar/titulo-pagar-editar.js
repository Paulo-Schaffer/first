$(function () {
    $idAlterar = -1;

    $tabelaTituloPagar = $("#tituloPagar-tabela").DataTable({
        "scrollX": true,
        ajax: '/titulopagar/obtertodos',
        serverSide: true,
        columns: [
            {
                render: function (data, type, row) {
                    return moment(row.DataVencimento).format('YYYY-MM-DD')
                }
            },
            {
                render: function (data, type, row) {
                    return moment(row.DataPagamento).format('YYYY-MM-DD')
                }
            },
            { data: "Valor" },
            {
                render: function (data, type, row) {
                    let cor = "";
                    if (row.Status == "Pago") {
                        cor = "bg-success";
                    } else if (row.Status == "Pendente") {
                         cor = "bg-warning";
                    } else {
                        cor = "bg-danger";
                    }
                    return "<span class='" + cor + " pr-2 pl-2 b2-1 rounded'>" + row.Status + "</span>"

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
                    <a class='btn btn-primary botao-editar fa fa-edit'\
                        href='/titulopagar/editar?id=" + row.Id + "'\
                        data-id=" + row.Id + "> Editar</a>";
               
                }
            }
        ]
    });

    //$("#titulo-pagar-parcelas-tabela").on('click', '.botao-apagar', function () {
    //    confirma = confirm("Deseja realmente apagar?");
    //    if (confirma == true) {
    //    $id = $(this).data('id');
    //    $.ajax({
    //        url: '/parcelaspagar/apagar?id=' + $id,
    //        method: "get",
    //        success: function (data) {
    //            $tabelaParcelas.ajax.reload();
    //        },
    //        error: function (err) {
    //            alert('Não foi possível apagar');
    //        }
    //    });
    //    }
    //});

    $("#gerar-parcelas").on("click", function () {
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

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data("id");
        $.ajax({
            url: '/parcelaspagar/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
            },
            error: function (err) {
                alert('Não foi possível carregar');
            }
        });
    });

    function monstrarMensagem(texto, titulo, tipo) {
        return false;
        new PNotify({
            title: titulo,
            text: texto,
            icon: 'icofont icofont-info-circle',
            type: tipo
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