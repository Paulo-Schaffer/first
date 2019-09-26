$(function () {
    $idAlterar = -1;
    $idTituloReceber = $("#id").val();

    $tabelaParcelas = $("#titulo-receber-parcelas-tabela").DataTable({
        ajax: '/parcelasreceber/obtertodos?idTituloReceber=' + $idTituloReceber,
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
                    if (row.DataRecebimento == null) {
                        return "";
                    }
                    return moment(row.DataRecebimento).format('DD/MM/YYYY')
                }
            },
            
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
                    return "\
                    <button class='btn btn-primary botao-editar fa fa-edit'\
                        data-id" + row.Id + "'\
                        data-id=" + row.Id + "> Editar</button>";
                    ;
                }
            }
        ]

    });
    $('#parcelasReceber-botao-salvar').on('click', function () {
        $dataRecebimento = $('#tituloReceber-campo-data-recebimento').val();
        debugger;
        $.ajax({
            url: "/ParcelasReceber/Update",
            method: "post",
            data: {
                DataRecibimento: $dataRecebimento,
                id: $idAlterar
            },
            success: function (data) {
                $("#modal-parcelaReceber").modal("hide");
                $idAlterar = -1;
                $tabelaParcelas.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    });
    //$("#tituloReceber-tabela").on('click', '.botao-apagar', function () {
    //    confirma = confirm("Deseja Realmente Apagar?")
    //    if (confirma == true) {
    //        $id = $(this).data('id');
    //        $.ajax({
    //            url: '/tituloreceber/apagar?id=' + $id,
    //            method: "get",
    //            success: function (data) {
    //                if ($('#tituloReceber-campo-tipo-pessoa-fisica').is(':checked')) {
    //                    radioButton = '"ClientePessoaFisica.Nome"';
    //                } else {
    //                }
    //                $tabelaTituloReceber.ajax.reload();
    //            },
    //            error: function (err) {
    //                alert('Não foi possível apagar');
    //            }
    //        });
    //    }
    //});
    $("#gerar-parcelas").on("click", function () {
        $.ajax({
            url: '/parcelasreceber/GerarParcelas?idTituloReceber=' + $idTituloReceber,
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
            url: '/parcelasReceber/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
                $('#tituloReceber-campo-data-recebimento').val(data.DataRecebimento);
                $('#tituloReceber-campo-status').val(data.Status);
                $('#modal-parcelasReceber').modal('show');
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