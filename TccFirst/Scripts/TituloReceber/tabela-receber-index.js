$(function () {
    $tabelaTituloReceber = $("#tituloReceber-tabela").DataTable({
        "scrollX": true,
        ajax: '/tituloreceber/obtertodos',
        serverSide: true,
        info: false,
        columns: [
            { data: "Id" },
            { data: "NomeCliente" }, 
            { data: "IdCategoriaReceita"},
            { data: "ValorTotal" },
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
                   <a class='btn btn-primary botao-editar fa fa-edit'\
                        href='/tituloreceber/editar?id=" + row.Id + "'\
                        data-id=" + row.Id + "> Editar</a>\
                    <button class='btn btn-danger botao-apagar fa fa-trash'\
                        data-id=" + row.Id + "> Apagar</button>";
                }
            }
        ]
    });

    $("#tituloReceber-tabela").on('click', '.botao-apagar', function () {
        confirma = confirm("Deseja Realmente Apagar?")
        if (confirma == true) {
            $id = $(this).data('id');
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
    });

});