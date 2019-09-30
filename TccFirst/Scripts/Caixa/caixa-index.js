$(function () {

    // Ao pressionar o botão enter focar no próximo campo
    $('#caixa-campo-descricao').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#caixa-campo-documento').focus();
        }
    });
    $('#caixa-campo-documento').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#caixa-campo-valor').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#caixa-campo-descricao').focus();
        }
    });
    $('#caixa-campo-valor').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#caixa-campo-forma-pagamento').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#caixa-campo-documento').focus();
        }
    });
    $('#caixa-campo-forma-pagamento').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#caixa-campo-forma-data-Lancamento').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#caixa-campo-valor').focus();
        }
    });
    $('#caixa-campo-data-lancamento').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#caixa-campo-historico').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#caixa-campo-forma-pagamento').focus();
        }
    });
    $('#caixa-campo-historico').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#caixa-botao-salvar').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#caixa-campo-data-lancamento').focus();
        }
    });
    $('#caixa-campo-historico').keyup(function (e) {
        if (e.keyCode == 37 || e.keyCode == 38) {
            $('#caixa-campo-historico').focus();
        }
    });

});
$(function () {
    $idAlterar = -1;
    $tabelaCaixa = $("#caixa-tabela").DataTable({
        "scrollX": true,
        ajax: '/Caixa/obtertodos',

        serverSide: true,
        columns: [
            { data: 'Operacao'},
            { data: 'Descricao' },
            { data: 'Documento' },
            { data: 'Valor' },
            { data: 'FormaPagamento' },
            {
                render: function (data, type, row) {
                    return moment(row.DataLancamento).format('DD/MM/YYYY')
                }
            },
            { data: 'Historico.Descricao' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar"data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar ml-2"data-id="' + row.Id + '">Apagar</button>'

                }
            }
        ]

    });
    $('#caixa-botao-salvar').on('click', function () {
        function monstrarMensagem(texto, titulo, tipo) {
            // Tipo -> error ,info, primary, success, default
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
        }
        $operacao = $('#caixa-campo-operacao').val();
        $descricao = $('#caixa-campo-descricao').val();
        $documento = $('#caixa-campo-documento').val();
        $formaPagamento = $('#caixa-campo-forma-pagamento').val();
        $valor = $('#caixa-campo-valor').val();
        $dataLancamento = $('#caixa-campo-data-lancamento').val();
        $IdHistoricos = $('#caixa-campo-historico').val();

        //Validação
        if ($operacao == "") {
            monstrarMensagem('Digite Descrição', '', 'error');
            $('#caixa-campo-operacao').focus();
            return false;
        }
        else if ($descricao == "") {
            monstrarMensagem('Digite Descrição', '', 'error');
            $('#caixa-campo-descricao').focus();
            return false;
        } else if ($documento == "") {
            monstrarMensagem('Digite o Documento', '', 'error');
            $('#caixa-campo-documento').focus();
            return false;
        } else if ($valor == "") {
            monstrarMensagem('Digite o Valor', '', 'error');
            $('#caixa-campo-valor').focus();
            return false;
        } else if ($formaPagamento == undefined) {
            monstrarMensagem('Selecione a Forma de Pagamento', '', 'error');
            $('#caixa-campo-forma-pagamento').focus();
            return false;
        } else if ($dataLancamento == "") {
            monstrarMensagem('Digite a Data de Lançamneto', '', 'error');
            $('#caixa-campo-data-lancamento').focus();
            return false;
        } else if ($IdHistoricos == undefined) {
            monstrarMensagem('Selecione o Histórico', '', 'error');
            $('#caixa-campo-historico').select2('open');
            return false;
        } else {
            monstrarMensagem('Registro Salvo com Sucesso', '', 'success');
        }

        if ($idAlterar == -1) {
            inserir($operacao, $descricao, $documento, $formaPagamento, $valor, $dataLancamento, $IdHistoricos);
        } else {
            alterar($operacao, $descricao, $documento, $formaPagamento, $valor, $dataLancamento, $IdHistoricos);
        }
    });

    function alterar($operacão, $descricao, $documento, $formaPagamento, $valor, $dataLancamento, $IdHistoricos) {
        $.ajax({
            url: "/Caixa/update",
            method: "post",
            data: {
                id: $idAlterar,
                Operacao: $operacao,
                Descricao: $descricao,
                Documento: $documento,
                Valor: $valor,
                FormaPagamento: $formaPagamento,
                DataLancamento: $dataLancamento,
                IdHistoricos: $IdHistoricos,
            },
            success: function (data) {
                $("#modal-caixa").modal("hide");
                LimparCampos();
                $idAlterar = -1;
                $tabelaCaixa.ajax.reload();
            },
            error: function (err) {
                alert("Moisés");
            }
        })
    }

    function inserir($operacao, $descricao, $documento, $formaPagamento, $valor, $dataLancamento, $IdHistoricos) {
        $.ajax({
            url: '/Caixa/inserir',
            method: 'post',
            data: {
                Operacao: $operacao,
                Descricao: $descricao,
                Documento: $documento,
                Valor: $valor,
                FormaPagamento: $formaPagamento,
                DataLancamento: $dataLancamento,
                IdHistoricos: $IdHistoricos,
            },
            success: function (data) {
                LimparCampos();
                $('#modal-caixa').modal('hide');
                $(".modal-backdrop").hide();
                $tabelaCaixa.ajax.reload();
            },
            error: function (err) {

            }
        });
    }

    $('.table').on('click', '.botao-apagar', function () {
        $idApagar = $(this).data('id');

        $.confirm({
            title: 'Deseja Realmente Apagar?',
            content: 'Clique no botão apagar para apagar o registro',
            buttons: {
                Apagar: {
                    btnClass: 'btn-red any-other-class',
                    action: function () {
                        $.ajax({
                            url: '/Caixa/apagar?id=' + $idApagar,
                            method: 'get',
                            success: function (data) {
                                $tabelaCaixa.ajax.reload();
                            },

                            error: function (err) {
                                alert('Moisés');
                            }

                        });
                    }
                },
                cancelar: function () {
                },
            }

        });

       
    });

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');
        $.ajax({
            url: '/caixa/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
                $('#caixa-campo-operacao').val(data.Operacao)
                $('#caixa-campo-descricao').val(data.Descricao);
                $('#caixa-campo-documento').val(data.Documento);
                $('#caixa-campo-valor').val(data.Valor);
                $('#caixa-campo-forma-pagamento').val(data.FormaPagamento);
                var dataLancamento = moment(data.DataLancamento);
                console.log();
                $("#caixa-campo-data-lancamento").val(dataLancamento.format('YYYY-MM-DD'));
                $('#caixa-campo-historico').val(data.IdHistoricos);
                $('#modal-caixa').modal('show');
            },
            error: function (err) {
                alert('Moisés');
            }
        });
    });

    function LimparCampos() {
        $("#caixa-campo-operacao").val("");
        $("#caixa-campo-descricao").val("");
        $("#caixa-campo-documento").val("");
        $("#caixa-campo-valor").val("");
        $("#caixa-campo-forma-pagamento").val("");
        $("#caixa-campo-data-lancamento").val("");
        $("#caixa-campo-historico").val("");
        $idAlterar = -1;
    }
    $('#modal-caixa').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })
});