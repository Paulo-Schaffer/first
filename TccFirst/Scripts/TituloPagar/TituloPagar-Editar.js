$(function () {
    $idTituloPagar = $("#id").val();
    $idAlterar = -1;

    $tabela = $("#tituloPagar-index").DataTable({
        ajax: "/tituloPagar/obtertodospeloidvenda?idTituloPagar=" + $idTituloPagar,
        serverSide: true,
        columns: [
            { data: "Descricao" },
            { data: "Forma de Pagamento" },
            { data: "Caixa" },
            { data: "Valor Total" },
            { data: "Status" },
            { data: "Data Lancamento" },
            { data: "Data Pagamento" },
            { data: "Data Vencimento" },
            { data: "Complemento" },
            { data: "Quantidade de Parcelas" },
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

    $("#tituloPagar-index").on("click",
        ".botao-apagar", function () {
            $id = $(this).data("id");
            $.ajax({
                url: "/tituloPagar/apagar?id=" + $id,
                method: "get",
                success: function () {
                    $tabela.ajax.reload();
                },
                error: function () {
                    alert('Não foi possível apagar');
                }
            });
        });

    $("#tituloPagar-salvar").on("click", function () {
        $Descricao = $("tituloPagar-descricao").val();
        $FormaPagamento = $("tituloPagar-formaPagamento").val();
        $Caixa = $("#tituloPagar-caixa").val();
        $ValorTotal = $("tituloPagar-valorTotal").val();
        $Status = $("tituloPagar-status").val();
        $DataLancamento = $("tituloPagar-dataLancamento").val();
        $DataPagamento = $("tituloPagar-dataPagamento").val();
        $DataVencimento = $("tituloPagar-dataVencimento").val();
        $Complemento = $("tituloPagar-complemento").val();
        $QuantidadeParcelas = $("tituloPagar-quantidadePacelas").val();

        if ($idAlterar == -1) {
            inserir($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataPagamento, $DataVencimento, $Complemento, $QuantidadeParcelas);
        } else {
            alterar($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataPagamento, $DataVencimento, $Complemento, $QuantidadeParcelas);
        }
    });

    function inserir($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataPagamento, $DataVencimento, $Complemento, $QuantidadeParcelas) {
        $.ajax({
            url: "/tituloPagar/cadastro",
            method: "post",
            data: {
                Descricao: $Descricao,
                FormaPagamento: $FormaPagamento,
                Caixa: $Caixa,
                ValorTotal: $ValorTotal,
                Status: $Status,
                DataLancamento: $DataLancamento,
                DataPagamento: $DataPagamento,
                DataVencimento: $DataVencimento,
                Complemento: $Complemento,
                QuantidadeParcelas: $QuantidadeParcelas
            },
            success: function (data) {
                limparCampos();
                $tabela.ajax.reload();
                $("tituloPagar-modal").modal("hide");
            },
            error: function (err) {
                alert("Não foi possível cadastrar");
            }
        });
    }


    $("#TituloPagar-index").on("click", ".botao-editar", function () {
        $id = $(this).data("id");
        $.ajax({
            url: "/tituloPagar/obterpeloid?id=" + $id,
            method: "get",
            success: function (data) {
                $idAlterar = $id;
                $("#modal-tituloPagar-descricao").val(data.Descricao);
                $("#modal-tituloPagar-formaPagamento").val(data.FormaPagamento);
                $("#modal-tituloPagar-caixa").val(data.Caixa);
                $("#modal-tituloPagar-valorTotal").val(data.ValorTotal);
                $("#modal-tituloPagar-status").val(data.Status);
                $("#modal-tituloPagar-dataLancamento").val(data.DataLancamento);
                $("#modal-tituloPagar-dataPagamento").val(data.DataPagamento);
                $("#modal-tituloPagar-dataVencimento").val(data.DataVencimento);
                $("#modal-tituloPagar-complemento").val(data.Complemento);
                $("#modal-tituloPagar-quantidadeParcelas").val(data.QuantidadeParcelas);
            },
            error: function (data) {
                alert("Não foi possível buscar o registro");
            }
        })
    });

    function alterar($Descricao, $FormaPagamento, $Caixa, $ValorTotal, $Status, $DataLancamento, $DataPagamento, $DataVencimento, $Complemento, $QuantidadeParcelas) {
        $.ajax({
            url: "/tituloPagar/alterar",
            method: "post",
            data: {
                Descricao: $Descricao,
                FormaPagamento: $FormaPagamento,
                Caixa: $Caixa,
                ValorTotal: $ValorTotal,
                Status: $Status,
                DataLancamento: $DataLancamento,
                DataPagamento: $DataPagamento,
                DataVencimento: $DataVencimento,
                Complemento: $Complemento,
                QuantidadeParcelas: $QuantidadeParcelas,
                id: $idAlterar, idTituloPagar: $idTituloPagar
            },
            success: function (data) {
                $("#tituloPagar-modal").modal("hide");
                limparCampos();
                $tabela.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        });
    }

    function limparCampos() {
        $("#modal-tituloPagar-descricao").val("");
        $("#modal-tituloPagar-formaPagamento").val("");
        $("#modal-tituloPagar-caixa").val("");
        $("#modal-tituloPagar-valorTotal").val("");
        $("#modal-tituloPagar-status").val("");
        $("#modal-tituloPagar-dataLancamento").val("");
        $("#modal-tituloPagar-dataPagamento").val("");
        $("#modal-tituloPagar-dataVencimento").val("");
        $("#modal-tituloPagar-complemento").val("");
        $("#modal-tituloPagar-quantidadeParcelas").val("");
        $idAlterar = -1;
    }

});