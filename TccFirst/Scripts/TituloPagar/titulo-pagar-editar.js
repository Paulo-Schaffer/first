$(function () {
    $idAlterar = -1;
    $idTituloPagar = $("#id").val();

    $tabelaTituloPagar = $("#tituloPagar-cadastro").DataTable({
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
                return moment(row.DataLancamento).format('YYYY-MM-DD')
            },
            
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

    function monstrarMensagem(texto, titulo, tipo) {
        return false;
        new PNotify({
            title: titulo,
            text: texto,
            icon: 'icofont icofont-info-circle',
            type: tipo
        });
    }
});