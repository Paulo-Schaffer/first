$(function () {
    $idAlterar = -1;
    $idTituloReceber = $("#id").val();

    $tabelaParcelas = $("#parcelasReceber-tabela").DataTable({
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

    });

    $('#tituloReceber-botao-salvar').on('click', function () {
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

        function monstrarMensagem(texto, titulo, tipo) {
            // Tipo -> error ,info, primary, success, default
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
        }
        if ($('#tituloReceber-campo-tipo-pessoa-juridica').is(':checked') || $('#tituloReceber-campo-tipo-pessoa-fisica').is(':checked')) {

        } else {
            monstrarMensagem('Escolha entra Pessoa Física ou Jurídica', '', 'error');
            return false;

        } if ($('#tituloReceber-campo-tipo-pessoa-juridica').is(':checked') && $IdClientePessoaJuridica == undefined) {
            monstrarMensagem('Selecione uma Pessoa Jurídica', '', 'error');
            $("#tituloReceber-campo-pessoa-Juridica").select2('open');
            return false;
        } else if ($('#tituloReceber-campo-tipo-pessoa-fisica').is(':checked') && $IdClientePessoFisica == undefined) {
            monstrarMensagem('Selecione uma Pessoa Fisica', '', 'error');
            $("#tituloReceber-campo-pessoa-fisica").select2('open');
            return false;
        }
        else if ($IdCategoriaReceita == undefined) {
            monstrarMensagem('Selecione uma Categoria Receita', '', 'error');
            $('#tituloReceber-campo-categoria-Receita').select2('open');
            return false;
        } else if ($Status == undefined) {
            monstrarMensagem('Selecione um status', '', 'error');
            $("#tituloReceber-campo-status").focus();
            return false;
        } else if ($DataLancamento == '') {
            monstrarMensagem('Digite a Data de Lançamento', '', 'error');
            $('#tituloReceber-campo-data-lancamento').focus();
            return false;
        } else if ($DataRecebimento == '') {
            monstrarMensagem('Digite a Data de Recebimento', '', 'error');
            $("#tituloReceber-campo-data-recebimento").focus();
            return false;
        } else if ($DataVencimento == '') {
            monstrarMensagem('Digite a Data de Vencimento', '', 'error');
            $("#tituloReceber-campo-data-vencimento").focus();
            return false;
        } else if ($QuantidadeParcela == '') {
            monstrarMensagem('Digite a Quantidade de Parcelas', '', 'error');
            $("#tituloReceber-campo-quantidade-Parcelas").focus();
            return false;
        } else if ($ValorTotal == '') {
            monstrarMensagem('Digite a Data de Valor Total', '', 'error');
            $("#tituloReceber-campo-valor-total").focus();
            return false;
        } else if ($Descricao == '') {
            monstrarMensagem('Digite a Descrição', '', 'error');
            $("#tituloReceber-campo-descricao").focus();
            return false;
        } else {

        }
    });

    $('#parcelasReceber-botao-salvar').on('click', function () {
        
        $dataRecebimento = $('#parcelasReceber-campo-data-recebimento').val();

       
        if ($categoriaReceita == undefined) {
            monstrarMensagem('Digite o Nome', '', 'error');
            $('#clientePessoaFisica-campo-nome').focus();
            return false;
        } else

        $.ajax({
            url: "/parcelasReceber/Update",
            method: "post",
            data: {
                DataRecebimento: $dataRecebimento,
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

    $("#gerar-parcelas").on("click", function () {
        $.ajax({
            url: '/parcelasReceber/GerarParcelas?idTituloReceber=' + $idTituloReceber,
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
                $('#parcelasReceber-campo-data-recebimento').val(data.DataRecebimento);
                $('#parcelasReceber-campo-status').val(data.Status);
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