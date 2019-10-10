$(function () {
    $('#caixa-campo-valor').mask('#.##0,00', { reverse: true });
    $tabelaTituloReceber = $("#tituloReceber-tabela").DataTable({
        "scrollX": true,
        ajax: '/tituloreceber/obtertodos',
        serverSide: true,
        info: false,
        columns: [
            { data: "Id" },
            { data: "NomeCliente" }, 
            { data: "CategoriaReceita.TipoCategoriaReceita"},
            {
                render: function (data, type, row) {
                    return "R$ " + row.ValorTotal
                }
            },
            { data: "QuantidadeParcela" },
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
            { data: "Descricao" },
            {
                render: function (data, type, row) {
                    return "\
                   <a class='btn botao-editar'\
                        href='/tituloreceber/editar?id=" + row.Id + "'\
                        data-id=" + row.Id + "><i class='fa fa-edit'></i>Editar</a>\
                    <button class='btn botao-apagar'\
                        data-id=" + row.Id + "><i class='fa fa-trash'></i>Apagar</button>";
                }
            }
        ]
    });

    $("#tituloReceber-tabela").on('click', '.botao-apagar', function () {
        $id = $(this).data('id');

        $.confirm({
            title: 'Deseja Realmente Apagar?',
            content: 'Clique no botão apagar para apagar o registro',
            buttons: {
                Apagar: {
                    btnClass: 'btn-red any-other-class',
                    action: function () {
                        $.ajax({
                            url: '/tituloreceber/apagar?id=' + $id,
                            method: "get",
                            success: function (data) {
                                $tabelaTituloReceber.ajax.reload();
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
});