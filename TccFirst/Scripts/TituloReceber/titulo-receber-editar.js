$(function () {
    $idTituloReceber = $("#id").val();
    $idAlterar = -1;
    var radioButton = "ClientePessoaJuridica.RazaoSocial";
    //if ($('#tituloReceber-campo-pessoa-fisica').is(':checked')) {
    //    radioButton = '"ClientePessoaFisica.Nome"';
    //    alert('caiu');
    //} else {
    //    alert('deu Ruim');
    //}


    $tabelaTituloReceber = $("#tituloReceber-tabela").DataTable({
        ajax: '/tituloreceber/obtertodos',
        serverSide: true,
        columns: [
            { data: "Id" },
            { data: radioButton },
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
        if ($.trim($('#tituloReceber-campo-pessoa-Juridica').val()) == '') {
        //    $.notifyDefaults({
        //        type: 'success',
        //        allow_dismiss: false
        //    });
            //$.notify('Selecione ');
            //return false;
        } else if ($.trim($('#tituloReceber-campo-categoria-Receita').val()) == '') {
            alert('Selecione uma Categoria Receita');
            return false;
        } else if ($.trim($('#tituloReceber-campo-status').val()) == '') {
            alert('Selecione um status');
            return false;
        }
        else if ($.trim($('#tituloReceber-campo-data-lancamento').val()) == '') {
            alert('Digite a Data de Lançamento');
            return false;
        } else if ($.trim($('#tituloReceber-campo-data-recebimento').val()) == '') {
            alert('Digite a Data de recebimento');
            return false;
        } else if ($.trim($('#tituloReceber-campo-data-vencimento').val()) == '') {
            alert('Digite a data de Vencimento');
            return false;
        } else if ($.trim($('#tituloReceber-campo-valor-total').val()) == '') {
            alert('Gigite o Valor Total');
            return false;
        } else if ($.trim($('#tituloReceber-campo-quantidade-Parcelas').val()) == '') {
            alert('Digite a Quantidade de Parcelas');
            return false;
        } else if ($.trim($('#tituloReceber-campo-descricao').val()) == '') {
            alert('Digite a Descrição');
            return false;
        } else {

        }
        $IdClientePessoaJuridica = $("#tituloReceber-campo-pessoa-Juridica").val();
        $IdClientePessoFisica = $("#tituloReceber-campo-pessoa-fisica").val();
        $IdCategoriaReceita = $("#tituloReceber-campo-categoria-Receita").val();
        $ValorTotal = $("#tituloReceber-campo-valor-total").val();
        $QuantidadeParcela = $("#tituloReceber-campo-quantidade-Parcelas").val();
        $Status = $("#tituloReceber-campo-status").val();
        $DataLancamento = $("#tituloReceber-campo-data-lancamento").val();
        $DataRecebimento = $("#tituloReceber-campo-data-recebimento").val();
        $DataVencimento = $("#tituloReceber-campo-data-vencimento").val();
        $Descricao = $("#tituloReceber-campo-descricao").val();
        if ($idAlterar == -1) {
            inserir($IdClientePessoaJuridica, $IdClientePessoFisica, $IdCategoriaReceita, $ValorTotal, $QuantidadeParcela, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Descricao);
        } else {
            alterar($IdClientePessoaJuridica, $IdClientePessoFisica, $IdCategoriaReceita, $ValorTotal, $QuantidadeParcela, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Descricao);
        }
    });

    function inserir($IdClientePessoaJuridica, $IdClientePessoFisica, $IdCategoriaReceita, $ValorTotal, $QuantidadeParcela, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Descricao) {
        $.ajax({
            url: '/tituloreceber/cadastro',
            method: 'post',
            data: {
                IdClientePessoaJuridica: $IdClientePessoaJuridica,
                IdClientePessoFisica: $IdClientePessoFisica,
                IdCategoriaReceita: $IdCategoriaReceita,
                ValorTotal: $ValorTotal,
                QuantidadeParcela: $QuantidadeParcela,
                Status: $Status,
                DataLancamento: $DataLancamento,
                DataRecebimento: $DataRecebimento,
                DataVencimento: $DataVencimento,
                Descricao: $Descricao,

            },
            success: function (data) {
                if ($('#tituloReceber-campo-tipo-pessoa-fisica').is(':checked')) {
                    radioButton = "ClientePessoaFisica.Nome";
                    $tabelaTituloReceber.ajax.reload();
                    alert('caiu');
                } else {
                    alert('deu Ruim');
                }
                LimparCampos();
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
                $("#tituloRecebertituloReceber-campo-pessoa-fisica").val(data.IdClientePessoFisica);
                $("#tituloReceber-campo-categoria-Receita").val(data.IdCategoriaReceita);
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
                $("#modal-tituloReceber").modal("show");
            },
            error: function (data) {
                alert("Não foi possível buscar o registro");
            }
        })
    });

    function alterar($IdClientePessoaJuridica, $IdClientePessoaFisica, $IdCategoriaReceita, $ValorTotal, $QuantidadeParcela, $Status, $DataLancamento, $DataRecebimento, $DataVencimento, $Descricao) {
        $.ajax({
            url: "/tituloreceber/editar",
            method: "post",
            data: {
                IdClientePessoaJuridica: $IdClientePessoaJuridica,
                IdClientePessoaFisica: $IdClientePessoaFisica,
                idCategoriareceita: $IdCategoriaReceita,
                ValorTotal: $ValorTotal,
                QuantidadeParcela: $QuantidadeParcela,
                Status: $Status,
                DataLancamento: $DataLancamento,
                DataRecebimento: $DataRecebimento,
                DataVencimento: $DataVencimento,
                Descricao: $Descricao,
                id: $idAlterar,
                //idTituloReceber: $idTituloReceber
            },
            success: function (data) {
                $("#modal-tituloReceber").modal("hide");
                LimparCampos();
                $tabelaTituloReceber.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        });
    }

    function LimparCampos() {
        $("#tituloReceber-campo-pessoa-Juridica").val("");
        $("#tituloReceber-campo-pessoa-fisica").val("");
        $("#tituloReceber-campo-categoria-Receita").val("");
        $("#tituloReceber-campo-status").val("");
        $("#tituloReceber-campo-valor-total").val("");
        $("#tituloReceber-campo-quantidade-Parcelas").val("");
        $("#tituloReceber-campo-descricao").val("");
        $("#tituloReceber-campo-data-lancamento").val("");
        $("#tituloReceber-campo-data-recebimento").val("");
        $("#tituloReceber-campo-data-vencimento").val("");
        $idAlterar = -1;
    }
    $('#modal-tituloReceber').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })
});