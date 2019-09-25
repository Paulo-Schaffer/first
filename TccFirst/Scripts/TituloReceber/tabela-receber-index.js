$(function (){
    $tabelaTituloReceber = $("#tituloReceber-tabela").DataTable({
        "scrollX": true,
        ajax: '/tituloreceber/obtertodos',
        serverSide: true,
        columns: [
            { data: "Id" },
            { data: 'NomeCliente' },
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
            { data: "Complemento" },
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

    //$(function () {

    //    // Ao pressionar o botão enter focar no próximo campo
    //    $('#tituloReceber-campo-categoria-Receita').keyup(function (e) {
    //        if (e.keyCode == 13) {
    //            $('#"tituloReceber-campo-status').focus();
    //        }
    //    });
    //    $('#tituloReceber-campo-status').keyup(function (e) {
    //        if (e.keyCode == 13) {
    //            $('#tituloReceber-campo-status').focus();
    //        }
    //    });
    //    $('#tituloReceber-campo-status').keyup(function (e) {
    //        if (e.keyCode == 13) {
    //            $('#tituloReceber-campo-data-lancamento').focus();
    //        }
    //    });
    //    $('#tituloReceber-campo-data-lancamento').keyup(function (e) {
    //        if (e.keyCode == 13) {
    //            $('#tituloReceber-campo-data-recebimento').focus();
    //        }
    //    });
    //    $('#tituloReceber-campo-data-recebimento').keyup(function (e) {
    //        if (e.keyCode == 13) {
    //            $('#tituloReceber-campo-data-vencimento').focus();
    //        }
    //    });
    //    $('#tituloReceber-campo-data-vencimento').keyup(function (e) {
    //        if (e.keyCode == 13) {
    //            $('#tituloReceber-campo-valor-total').focus();
    //        }
    //    });
    //    $('#tituloReceber-campo-valor-total').keyup(function (e) {
    //        if (e.keyCode == 13) {
    //            $('#tituloReceber-campo-quantidade-Parcelas').focus();
    //        }
    //    });
    //    $('#tituloReceber-campo-quantidade-Parcelas').keyup(function (e) {
    //        if (e.keyCode == 13) {
    //            $('#tituloReceber-campo-complemento').focus();
    //        }
    //    });
    //    $('#tituloReceber-campo-complemento').keyup(function (e) {
    //        if (e.keyCode == 13) {
    //            $('#tituloReceber-campo-descricao').focus();
    //        }
    //    });
      
    //    $('#tituloReceber-campo-descricao').keyup(function (e) {
    //        if (e.keyCode == 13) {
    //            $('#tituloReceber-batao-salvar').focus();
    //        }
    //    });
    //});
});