$(function () {
    $idTituloReceber = $("#id").val();
    $idAlterar = -1;

    $tabelaTituloReceber = $("#tituloReceber-tabela").DataTable({
        "scrollX": true,
        ajax: '/tituloreceber/obtertodos',
        serverSide: true,
        columns: [
            { data: "Id" },
            { data: "IdClientePessoaJuridica" },
            { data: "ValorTotal" },
            { data: "QuantidadeParcelas" },
            { data: "Descricao" },
            { data: "DataLancamento" },
            { data: "DataRecebimento" },
            { data: "DataVencimento" },
            //{ data: "Status" },
            { data: "Complemento" },
            {
                render: function (data, type, row) {
                    return "\
<button class='btn btn-primary botao-editar'\
    data-id=" + row.Id + ">Editar</button>\
<button class='btn btn-danger botao-apagar'\
    data-id=" + row.Id + ">Apagar</button>";
                }
            }
        ]
    });

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
        $idPessoaJuridica = $("#tituloReceber-campo-pessoa-Juridica").val();
        $idPessoaFisica = $("#tituloReceber-campo-pessoa-Fisica").val();
        $idCategoriaReceita = $("#tituloReceber-campo-categoria-Receita").val();
        $valor = $("#tituloReceber-campo-valor").val();
        $quantidadeDeParcelas = $("#tituloReceber-campo-quantidade-Parcelas").val();
        $descricao = $("#tituloReceber-campo-descricao").val();
        $dataLancamento = $("#tituloReceber-campo-data-lancamento").val();
        $dataRecebimento = $("#tituloReceber-campo-data-recebimento").val();
        $dataVencimento = $("#tituloReceber-campo-data-vencimento").val();
        $complemento = $("#tituloReceber-campo-complemento").val();
        if ($idAlterar == -1) {
            inserir($idPessoaJuridica, $idPessoaFisica, $idCategoriaReceita, $valor, $quantidadeDeParcelas, $descricao, $dataLancamento, $dataRecebimento, $dataVencimento, $complemento);
        } else {
            alterar($idPessoaJuridica, $idPessoaFisica, $idCategoriaReceita, $valor, $quantidadeDeParcelas, $descricao, $dataLancamento, $dataRecebimento, $dataVencimento, $complemento);
        }
    });

    function inserir($IdClientePessoaJuridica, $IdCategoriaReceita, $ValorTotal, $QuantidadeParcela, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Descricao, $Complemento) {
        $.ajax({
            url: '/tituloreceber/cadastro',
            method: 'post',
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
                limparCampos();
                $("#modal-tituloReceber").modal("hide");
                $(".modal-backdrop").hide();
                $tabelaTituloReceber.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível cadastrar");
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
                $("#tituloReceber-campo-valor").val(data.ValorTotal);
                $("#tituloReceber-campo-quantidade-Parcelas").val(data.QuantidadeParcelas);
                $("#tituloReceber-campo-descricao").val(data.Descricao);
                $("#tituloReceber-campo-data-lancamento").val(data.DataLancamneto);
                $("#tituloReceber-campo-data-recebimento").val(data.DataRecebimento);
                $("#tituloReceber-campo-data-vencimento").val(data.DataVencimento);
                $("#tituloReceber-campo-complemento").val(data.Complemento);
                $("#modal-tituloReceber").modal("show");
            },
            error: function (data) {
                alert("Não foi possível buscar o registro");
            }
        })
    });

    function alterar($idPessoaJuridica, $idPessoaFisica, $idCategoriaReceita, $valor, $quantidadeDeParcelas, $descricao, $dataLancamento, $dataRecebimento, $dataVencimento, $complemento) {
        $.ajax({
            url: "/tituloreceber/alterar",
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
                idTituloReceber: $idTituloReceber
            },
            success: function (data) {
                $("#modal-tituloReceber").modal("hide");
                limparCampos();
                $tabelaTituloReceber.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        });
    }

    function limparCampos() {
        $("#tituloReceber-campo-pessoa-Juridica").val("");
        $("#tituloReceber-campo-pessoa-Fisica").val("");
        $("#tituloReceber-campo-categoria-Receita").val("");
        $("#tituloReceber-campo-valor").val("");
        $("#tituloReceber-campo-quantidade-Parcelas").val("");
        $("#tituloReceber-campo-descricao").val("");
        $("#tituloReceber-campo-data-lancamento").val("");
        $("#tituloReceber-campo-data-recebimento").val("");
        $("#tituloReceber-campo-data-vencimento").val("");
        $("#tituloReceber-campo-complemento").val("");
        $idAlterar = -1;
    }

});