$(function () {
    $idTituloReceber = $("#id").val();
    $idAlterar = -1;
    $idTituloReceber = $("#id").val();

    $tabelaParcelas = $("#titulo-receber-parcelas-tabela").DataTable({
        ajax: '/parcelasreceber/obtertodos?idTituloReceber=' + $idTituloReceber,
        serverSide: true,
        info: false,
        paging: false,
        searching: false,
        columns: [
            { data: "Id" },
            { data: "IdClientePessoaJuridica" },
            { data: "ValorTotal" },
            { data: "QuantidadeParcela" },
            { data: "Status" },
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
                    ;
                }
            }
        ]

    $("#tituloReceber-tabela").on('click', '.botao-apagar', function () {
        $id = $(this).data('id');
        $.confirm({
            title: 'Deseja Realmente Apagar?',
            content: 'Clique no botão Apagar para apagar o registro',
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
                                $.confirm({
                                    title: 'Não foi possível Apagar',
                                    content: 'Houve algum problema ao tentar apagar este registro',
                                    type: 'red',
                                    typeAnimated: true,
                                    buttons: {
                                        
                                        Ok: function () {
                                        }
                                    }
                                });
                            }
                        });
                    }
                },
                cancelar: function () {
                },
            }
        });
    });


    $("#titulo-receber-botao-salvar").on("click", function () {
        $IdClientePessoaJuridica = $("#tituloReceber-campo-pessoa-Juridica").val();
        $IdCategoriaReceita = $("#tituloReceber-campo-categoria-Receita").val();
        $ValorTotal = $("#tituloReceber-campo-valor-total").val();
        $QuantidadeParcela = $("#tituloReceber-campo-quantidade-Parcelas").val();
        $Status = $("#tituloReceber-campo-status").val();
        $DataLancamento = $("#tituloReceber-campo-data-lancamento").val();
        $DataRecebimento = $("#tituloReceber-campo-data-recebimento").val();
        $DataVencimento = $("#tituloReceber-campo-data-vencimento").val();
        $Descricao = $("#tituloReceber-campo-descricao").val();
        $Complemento = $("#tituloReceber-campo-complemento").val();
        if ($idAlterar == -1) {
            inserir($IdClientePessoaJuridica, $IdCategoriaReceita, $ValorTotal, $QuantidadeParcela, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Descricao, $Complemento);
        } else {
            alterar($IdClientePessoaJuridica, $IdCategoriaReceita, $ValorTotal, $QuantidadeParcela, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Descricao, $Complemento);
        }
    });

    function inserir($IdClientePessoaJuridica, $IdCategoriaReceita, $ValorTotal, $QuantidadeParcela, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Descricao, $Complemento) {
        $.ajax({
            url: "/ParcelasReceber/Update",
            method: "post",
            data: {
                IdClientePessoaJuridica: $IdClientePessoaJuridica,
                IdCategoriaReceita: $IdCategoriaReceita,
                ValorTotal: $ValorTotal,
                QuantidadeParcela: $QuantidadeParcela,
                Status: $Status,
                DataLancamento: $DataLancamento,
                DataRecebimento: $DataRecebimento,
                DataVencimento: $DataVencimento,
                Descricao: $Descricao,
                Complemento: $Complemento,

            },
            success: function (data) {
                $("#modal-parcelaReceber").modal("hide");
                $idAlterar = -1;
                $tabelaParcelas.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        });
    }

    $('.table').on("click", ".botao-editar", function () {
        $id = $(this).data("id");
        $.ajax({
            url: "/tituloreceber/obterpeloid?id=" + $id,
            method: "get",
            success: function (data) {
                $idAlterar = $id;
                $("#tituloReceber-campo-pessoa-Juridica").val(data.IdClientePessoaJuridica);
                $("#tituloReceber-campo-categoria-Receita").val(data.IdCategoriaReceita);// NÃO PUXOU
                $("#tituloReceber-campo-valor-total").val(data.ValorTotal);
                $("#tituloReceber-campo-quantidade-Parcelas").val(data.QuantidadeParcela);
                $("#tituloReceber-campo-status").val(data.Status);
                var dataLancamento = moment(data.dataLancamento);
                console.log;
                $("#tituloReceber-campo-data-lancamento").val(dataLancamento.format('YYYY-MM-DD'));
                var dataRecebimento = moment(data.dataRecebimento);
                console.log;
                $("#tituloReceber-campo-data-recebimento").val(dataRecebimento.format('YYYY-MM-DD'));
                var dataVencimento = moment(data.dataVencimento);
                console.log;
                $("#tituloReceber-campo-data-vencimento").val(dataVencimento.format('YYYY-MM-DD'));
                $("#tituloReceber-campo-descricao").val(data.Descricao);
                $("#tituloReceber-campo-complemento").val(data.Complemento);
                $("#modal-tituloReceber").modal("show");
            },
            error: function (err) {
                alert('Não foi possível gerar parcelas');
            }
        });
    });

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data("id");
        $.ajax({
            url: "/tituloreceber/editar",
            method: "post",
            data: {
                IdClientePessoaJuridica: $IdClientePessoaJuridica,
                idCategoriareceita: $IdCategoriaReceita,
                ValorTotal: $ValorTotal,
                QuantidadeParcela: $QuantidadeParcela,
                Status: $Status,
                DataLancamento: $DataLancamento,
                DataRecebimento: $DataRecebimento,
                DataVencimento: $DataVencimento,
                Descricao: $Descricao,
                Complemento: $Complemento,
                id: $idAlterar,
                //idTituloReceber: $idTituloReceber
            },
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