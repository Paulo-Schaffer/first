$(function () {
    $tabelaTituloPagar = $("#tituloPagar-tabela").DataTable({
        "scrollX": true,
        ajax: '/titulopagar/obtertodos',
        serverSide: true,
        info: false,
        columns: [
            { data: "Id" },
            { data: "Fornecedor.RazaoSocial" },
            { data: "CategoriaDespesa.TipoCategoriaDespesa" },
            { data: "FormaPagamento" },
            { data: "Caixa" },
            { data: "ValorTotal" },
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
                    return moment(row.DataLancamento).format('DD/MM/YYYY')
                }
            },
            {
                render: function (data, type, row) {
                    return moment(row.DataRecebimento).format('DD/MM/YYYY')
                }
            },
            {
                render: function (data, type, row) {
                    return moment(row.DataVencimento).format('DD/MM/YYYY')
                }
            },

            { data: "QuantidadeParcela" },
            { data: "Descricao" },
            {
                render: function (data, type, row) {
                    return "\
                    <a class='btn btn-primary botao-editar fa fa-edit'\
                        href='/titulopagar/editar?id=" + row.Id + "'\
                        data-id=" + row.Id + "> Editar</a>\
                    <button class='btn btn-danger botao-apagar fa fa-trash'\
                        data-id=" + row.Id + "> Apagar</button>";
                }
            }
        ]
    });

    $("#tituloPagar-tabela").on('click', '.botao-apagar', function () {
        $idApagar = $(this).data('id');
        $.confirm({
            title: 'Deseja Realmente Apagar?',
            content: 'Clique no botão apagar para apagar o registro',
            buttons: {
                Apagar: {
                    btnClass: 'btn-red any-other-class',
                    action: function () {

                        $.ajax({
                            url: '/tituloPagar/apagar?id=' + $id,
                            method: "get",
                            success: function (data) {
                                $tabelaTituloPagar.ajax.reload();
                            },
                            error: function (err) {
                                alert('Não foi possível apagar');
                            }
                        });
                    }
                },
                cancelar: function () {
                },
            }
        });
    });

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data("id");
        $.ajax({
            url: '/tituloPagar/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
                $('#tituloPagar-campo-fornecedor').val(data.Fornecedor);
                $('#tituloPagar-campo-categoria-despesa').val(data.TipoFuncionario);
                $('#tituloPagar-campo-forma-pagamento').val(data.FormaPagamento);
                $('#tituloPagar-campo-caixa').val(data.Caixa);
                $('#tituloPagar-campo-status').val(data.Status);
                $('#tituloPagar-campo-data-lancamento').val(data.DataLancamento);
                $('#tituloPagar-campo-data-recebimento').val(data.DataRecebimento);
                $('#tituloPagar-campo-data-vencimento').val(data.DataVencimento);
                $('#tituloPagar-campo-quantidade-parcela').val(data.QuantidadeParcela);
                $('#tituloPagar-campo-descricao').val(data.Descricao);
                $('#modal-tituloPagar').modal('show');
            },
            error: function (err) {
            }
        });
    });

   /* $('#clientePessoaFisica-batao-salvar').on('click', function () {

        $fornecedor = $('#tituloPagar-campo-fornecedor').val();
        $categoriaDespesas = $('#tituloPagar-campo-categoria-despesa').val();
        $formaPagamento = $('#tituloPagar-campo-forma-pagamento').val();
        $status = $('#tituloPagar-campo-status').val();
        $dataLancamento = $('#tituloPagar-campo-data-lancamento').val();
        $dataRecebimento = $('#tituloPagar-campo-data-recebimento').val();
        $dataVencimento = $('#tituloPagar-campo-data-vencimento').val();
        $quantidadeParcelas = $('#tituloPagar-campo-quantidade-parcela').val();
        $valorTotal = $('#tituloPagar-campo-valor-total').val();
        $descricao = $('#tituloPagar-campo-descricao').val();
        function mostrarMensagem(texto, titulo, tipo) {
            return false;
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
        }
        if ($fornecedor == "") {
            monstrarMensagem('Digite o Fornecedor', '', 'error');
            $('#tituloPagar-campo-fornecedor').focus();
            return false;
        } else if ($categoriaDespesas == "") {
            monstrarMensagem('Digite a Categoria Despesas', '', 'error');
            $('#tituloPagar-campo-categoria-despesa').focus();
            return false;
        } else if ($formaPagamento == "") {
            monstrarMensagem('Digite a Forma Pagamento', '', 'error');
            $('#tituloPagar-campo-forma-pagamento').focus();
            return false;
        } else if ($status == "") {
            monstrarMensagem('Digite o Status', '', 'error');
            $('#tituloPagar-campo-status').focus();
            return false;
        } else if ($dataLancamento == "") {
            monstrarMensagem('Digite o Data Lançamento', '', 'error');
            $('#tituloPagar-campo-data-lancamento').focus();
            return false;
        } else if ($dataRecebimento == "") {
            monstrarMensagem('Digite o Data Recebimento', '', 'error');
            $('#tituloPagar-campo-data-recebimento').focus();
            return false;
        } else if ($dataVencimento == "") {
            monstrarMensagem('Digite o Data Vencimento', '', 'error');
            $('#tituloPagar-campo-data-vencimento').focus();
            return false;
        } else if ($quantidadeParcelas == "") {
            monstrarMensagem('Digite a Quantidade de Parcela', '', 'error');
            $('#tituloPagar-campo-quantidade-parcela').focus();
            return false;
        } else if ($descricao == "") {
            monstrarMensagem('Digite a Descriçao', '', 'error');
            $('#tituloPagar-campo-descricao').focus();
            return false;
        } else if ($valorTotal == "") {
            monstrarMensagem('Digite o Valor Total', '', 'error');
            $('#tituloPagar-campo-valor-total').focus();
            return false;
        } else {
            monstrarMensagem('Registro Salvo com Sucesso', '', 'success');
        }
        if ($idAlterar == -1) {
            inserir($fornecedor, $categoriaDespesas, $formaPagamento, $status, $dataLancamento, $dataRecebimento, $dataVencimento, $quantidadeParcelas, $descricao, $valorTotal);

        } else {
            alterar($fornecedor, $categoriaDespesas, $formaPagamento, $status, $dataLancamento, $dataRecebimento, $dataVencimento, $quantidadeParcelas, $descricao, $valorTotal);
        }
    });*/
});

