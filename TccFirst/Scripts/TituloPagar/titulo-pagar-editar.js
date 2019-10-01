$(function () {
    $idAlterar = -1;
    $idTituloPagar = $("#id").val();

    $tabelaParcelas = $("#parcelasPagar-tabela").DataTable({
        ajax: '/parcelaspagar/obtertodos?idTituloPagar=' + $idTituloPagar,
        serverSide: true,
        info: false,
        paging: false,
        searching: false,
        columns: [
            {
                render: function (data, type, row) {
                    return moment(row.DataVencimento).format('DD/MM/YYYY')
                }
            },
            {
                render: function (data, type, row) {
                    if (row.DataPagamento == null) {
                        return "";
                    }
                    return moment(row.DataPagamento).format('DD/MM/YYYY')
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
                    return "\
                    <button class='btn btn-primary botao-editar fa fa-edit'\
                        data-id" + row.Id + "'\
                        data-id=" + row.Id + "> Editar</button>";

                }
            }
        ]
    });
    $('#tituloPagar-botao-salvar').on('click', function () {

        $Fornecedor = $("#tituloPagar-campo-fornecedor").val();
        $CategoriaDespesa = $("#tituloPagar-campo-categoria-despesa").val();
        $FormaPagamento = $("#tituloPagar-campo-forma-pagamento").val();
        $Status = $("#tituloPagar-campo-status").val();
        $Caixa = $("#tituloPagar-campo-caixa").val();
        $Banco = $("#tituloPagar-campo-banco").val();
        $DataLancamento = $("#tituloPagar-campo-data-lancamento").val();
        $DataRecebimento = $("#tituloPagar-campo-data-recebimento").val();
        $DataVencimento = $("#tituloPagar-campo-data-vencimento").val();
        $QuantidadeParcela = $("#tituloPagar-campo-quantidade-parcela").val();
        $Descricao = $("#tituloPagar-campo-descricao").val();
        $Valor = $("#tituloPagar-campo-valor-total").val();
        function monstrarMensagem(texto, titulo, tipo) {
            // Tipo -> error ,info, primary, success, default
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
        }
        if ($('#tituloPagar-campo-caixa').is(':checked') || $('#tituloPagar-campo-banco').is(':checked')) {

        } else {
            monstrarMensagem('Escolha entra Caixa ou Banco', '', 'error');
            return false;
        }

        if ($Fornecedor == undefined) {
            monstrarMensagem('Selecione um   Fornecedor', '', 'error');
            $("#tituloPagar-campo-fornecedor").select2('open');
            return false;
        } else if ($CategoriaDespesa == undefined) {
            monstrarMensagem('Selecione uma Categoria Despesa', '', 'error');
            $("#tituloPagar-campo-categoria-despesa").select2('open');
            return false;
        } else if ($FormaPagamento == undefined) {
            monstrarMensagem('Selecione uma Forma Pagamento', '', 'error');
            $("#tituloPagar-campo-forma-pagamento").focus();
            return false;
        } else if ($Status == undefined) {
            monstrarMensagem('Selecione um status', '', 'error');
            $("#tituloPagar-campo-status").focus();
            return false;
        } else if ($DataLancamento == '') {
            monstrarMensagem('Selecione uma Data Lançamento', '', 'error');
            $("#tituloPagar-campo-data-lancamento").focus();
            return false;
        } else if ($DataRecebimento == '') {
            monstrarMensagem('Selecione uma Data Recebimento', '', 'error');
            $("#tituloPagar-campo-data-recebimento").focus();
            return false;
        } else if ($DataVencimento == '') {
            monstrarMensagem('Selecione uma Data Vencimento', '', 'error');
            $("#tituloPagar-campo-data-vencimento").focus();
            return false;
        } else if ($QuantidadeParcela == '') {
            monstrarMensagem('Digite um Quantidade Parcela', '', 'error');
            $("#tituloPagar-campo-quantidade-parcela").val();
            return false;
        } 
        else if ($Descricao == '') {
            monstrarMensagem('Digite uma Descricao', '', 'error');
            $("#tituloPagar-campo-descricao").val();
            return false;
        } 
        else if ($Valor == '') {
            monstrarMensagem('Digite um Valor', '', 'error');
            $("#tituloPagar-campo-valor").val();
            return false;
        } 

        }
    );

    $('#parcelasPagar-botao-salvar').on('click', function () {
        $dataPagamento = $('#parcelasPagar-campo-data-pagamento').val();
        $.ajax({
            url: "/parcelasPagar/update",
            method: "post",
            data: {
                DataPagamento: $dataPagamento,
                id: $idAlterar
            },
            success: function (data) {
                $("#modal-parcelaPagar").modal("hide");
                $idAlterar = -1;
                $tabelaParcelas.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    });

    $("#gerar-parcelas").on("click", function () {
        $.ajax({
            url: '/parcelasPagar/GerarParcelas?idTituloPagar=' + $idTituloPagar,
            method: "get",
            success: function (data) {
                $tabelaParcelas.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possível gerar parcelas');
            }
        });
    });

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data("id");
        $.ajax({
            url: '/parcelasPagar/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
                $('#parcelasPagar-campo-data-pagamento').val(data.DataPagamento);
                $('#parcelasPagar-campo-status').val(data.Status);
                $('#modal-parcelasPagar').modal('show');
            },
            error: function (err) {
                alert('Não foi possível carregar');
            }
        });
    });

});


