$(function () {
    $idAlterar = -1;

    $tabelaTituloPagar = $("#tituloPagar-tabela").DataTable({
        "scrollX": true,
        ajax: '/titulopagar/obtertodos',
        serverSide: true,
        columns: [
            { data: 'Id' },
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
});