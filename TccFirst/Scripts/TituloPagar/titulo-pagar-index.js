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
                    return moment(row.DataVencimento).format('DD/MM/YYYY')
                }
            },
            { data: "QuantidadeParcela" },
            { data: "Descricao" },
            {
                render: function (data, type, row) {
                    return "\
                    <a class='btn btn-primary botao-editar'\
                        href='/titulopagar/editar?id=" + row.Id + "'\
                        data-id=" + row.Id + "><i class=' fa fa-edit'></i> Editar</a>\
                    <button class='btn btn-danger botao-apagar'\
                        data-id=" + row.Id + "><i class=' fa fa-trash'></i> Apagar</button>";
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
                            url: '/tituloPagar/apagar?id=' + $idApagar,
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
                $('#tituloPagar-campo-categoria-despesa').val(data.CategoriaDespesa);
                $('#tituloPagar-campo-forma-pagamento').val(data.FormaPagamento);
                $('#tituloPagar-campo-caixa').val(data.Caixa);
                $('#tituloPagar-campo-status').val(data.Status);
                $('#tituloPagar-campo-data-lancamento').val(data.DataLancamento);
                $('#tituloPagar-campo-data-vencimento').val(data.DataVencimento);
                $('#tituloPagar-campo-quantidade-parcela').val(data.QuantidadeParcela);
                $('#tituloPagar-campo-descricao').val(data.Descricao);
                $('#modal-tituloPagar').modal('show');
            },
            error: function (err) {
            }
        });
    });

});

