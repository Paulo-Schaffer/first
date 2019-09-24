$(function () {
    $idAlterar = -1;
    $idTituloPagar = $("#id").val();

    $tabelaParcelas = $("#titulo-pagar-parcelas-tabela").DataTable({
        ajax: '/parcelaspagar/obtertodos?idTituloPagar=' + $idTituloPagar,
        serverSide: true,
        columns: [
            { data: "Id" },
            { data: 'DataVencimento' },
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
                        data-id=" + row.Id + "> Editar</button>\
                    <button class='btn btn-danger botao-apagar fa fa-trash'\
                        data-id=" + row.Id + "> Apagar</button>";
                }
            }
        ]
    });

    //$("#tituloPagar-tabela").on('click', '.botao-apagar', function () {
    //    confirma = confirm("Deseja realmente apagar?");
    //    if (confirma == true) {
    //    $id = $(this).data('id');
    //    $.ajax({
    //        url: '/titulopagar/apagar?id=' + $id,
    //        method: "get",
    //        success: function (data) {
    //            $tabelaTituloPagar.ajax.reload();
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