$(function () {
    $idAlterar = -1;
    $idTituloPagar = $("#id").val();

    $tabelaParcelas = $("#titulo-pagar-parcelas-tabela").DataTable({
        ajax: '/parcelaspagar/obtertodos?idTituloPagar=' + $idTituloPagar,
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
            url: '/parcelaspagar/GerarParcelas?idTituloPagar=' + $idTituloPagar,
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
            url: '/tituloPagar/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
                $('#tituloPagar-campo-data-vencimento').val(data.DataVencimento);
                $('#tituloPagar-campo-data-pagamento').val(data.DataPagamento);
                $('#tituloPagar-campo-valor').val(data.Valor);
                $('#tituloPagar-campo-status').val(data.Status);
                $('#modal-tituloPagar').modal('show');
            },
            error: function (err) {
                alert('Não foi possível carregar!');
            }
        });
    });

    function alterar($Valor, $Status, $DataVencimento, $DataPagamento ) {
        $.ajax({
            url: "/tituloPagar/update",
            method: "post",
            data: {
                Valor: $Valor,
                Status: $Status,
                DataVencimento: $DataVencimento,
                DataPagamento: $DataPagamento,
                id: $idAlterar
            },
            success: function (data) {
                $("#modal-tituloPagar").modal("hide");
                $idAlterar = -1;
                $tabelaParcelas.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    }

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