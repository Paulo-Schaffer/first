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

    $('#parcelasPagar-botao-salvar').on('click', function () {
        $dataPagamento = $('#parcelasPagar-campo-data-pagamento').val();
        debugger;
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
                alert('esse aqui mesmo');
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
