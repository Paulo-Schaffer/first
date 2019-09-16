$(function () {
    $idTituloReceber = $("#id").val();
    $idAlterar = -1;

    $tabelaTituloReceber = $("#tituloReceber-tabela").DataTable({
        ajax: '/tituloreceber/obtertodos',
        serverSide: true,
        columns: [
            { data: "Id" },
            { data: "PessoaJuridica" },
            { data: "ValorTotal" },
            { data: "QuantidadeParcela" },
            { data: "Status" },
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
<button class='btn btn-primary botao-editar'\
    data-id=" + row.Id + ">Editar</button>\
<button class='btn btn-danger botao-apagar'\
    data-id=" + row.Id + ">Apagar</button>";
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
      

    $("#titulo-receber-botao-salvar").on("click", function () {
        $IdPessoaJuridica = $("#tituloReceber-campo-pessoa-Juridica").val();
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
            inserir($IdPessoaJuridica, $IdCategoriaReceita, $ValorTotal, $QuantidadeParcela, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Descricao, $Complemento);
        } else {
            alterar($IdPessoaJuridica, $IdCategoriaReceita, $ValorTotal, $QuantidadeParcela, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Descricao, $Complemento);
        }
    });

    function inserir($IdPessoaJuridica, $IdCategoriaReceita, $ValorTotal, $QuantidadeParcela, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Descricao, $Complemento) {
        $.ajax({
            url: '/tituloreceber/cadastro',
            method: 'post',
            data: {
                IdPessoaJuridica: $IdPessoaJuridica,
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
            error: function (data) {
                alert("Não foi possível buscar o registro");
            }
        })
    });

    function alterar($IdPessoaJuridica, $IdCategoriaReceita, $ValorTotal, $QuantidadeParcela, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Descricao, $Complemento) {
        $.ajax({
            url: "/tituloreceber/editar",
            method: "post",
            data: {
                IdPessoaJuridica: $IdPessoaJuridica,
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
        $("#tituloReceber-campo-categoria-Receita").val("");
        $("tituloReceber-campo-status").val("");
        $("#tituloReceber-campo-valor-total").val("");
        $("#tituloReceber-campo-quantidade-Parcelas").val("");
        $("#tituloReceber-campo-descricao").val("");
        $("#tituloReceber-campo-data-lancamento").val("");
        $("#tituloReceber-campo-data-recebimento").val("");
        $("#tituloReceber-campo-data-vencimento").val("");
        $("#tituloReceber-campo-complemento").val("");
        $idAlterar = -1;
    }

});