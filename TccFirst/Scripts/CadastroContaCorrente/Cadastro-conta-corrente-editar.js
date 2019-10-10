$(function () {

    $('#cadastro-conta-corrente-campo-idAgencia').keyup(function (e) {
        if (e.keyCode == 40 || e.keyCode == 13) {
            $('#cadastro-conta-corrente-campo-numero-conta').focus();
        }
    });
    $('#cadastro-conta-corrente-campo-numero-conta').keyup(function (e) {
        if (e.keyCode == 38) {
            $('#cadastro-conta-corrente-campo-idAgencia').focus();
        } else if (e.keyCode == 40) {
            $('#cadastro-conta-corrente-botao-salvar').focus();
        }
    });
});

$(function () {
    $idAlterar = -1;
    $tabelaCadastroContaCorrente = $('#cadastro-conta-corrente-tabela').DataTable({
        ajax: '/cadastrocontacorrente/ObterTodos',
        serverSide: true,
        columns: [
            { data: "Id" },
            { data: "Agencia.NomeAgencia" },
            { data: "NumeroConta" },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '" id="botao-editar"><i class="fa fa-edit"></i>Editar</button>\<button class="btn btn-danger botao-apagar ml-2" data-id="' + row.Id + '" id="botao-apagar"><i class="fa fa-trash"></i>Apagar</button>'
                }
            }
        ]
    });


    $("#cadastro-conta-corrente-tabela").on("click", ".botao-apagar", function () {
        $id = $(this).data("id");
        $.confirm({
            title: 'Deseja Realmente Apagar?',
            content: 'Clique no botão Apagar para apagar o registro',
            buttons: {
                Apagar: {
                    btnClass: 'btn-red any-other-class',
                    action: function () {
                        $.ajax({
                            url: '/cadastrocontacorrente/apagar?id=' + $id,
                            method: "get",
                            success: function (data) {
                                $tabelaCadastroContaCorrente.ajax.reload();
                            },
                            error: function (err) {
                                alert('Não foi possível apagar');
                            }
                        });
                    }
                },
                cancelar: function () {
                },
            }
        });
    });



    $('#cadastro-conta-corrente-botao-salvar').on('click', function () {
        function monstrarMensagem(texto, titulo, tipo) {
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
        }
        $idAgencia = $('#cadastro-conta-corrente-campo-idAgencia').val();
        $numeroConta = $('#cadastro-conta-corrente-campo-numero-conta').val();
        if ($idAgencia == undefined) {
            monstrarMensagem('Selecione uma Agência', '', 'error');
            $('#cadastro-conta-corrente-campo-idAgencia').select2('open');
            return false;
        } else if ($numeroConta == "") {
            monstrarMensagem('Digite o Número da Conta Corrente', '', 'error');
            $('#cadastro-conta-corrente-campo-numero-conta').focus();
            return false;
        } else {
            monstrarMensagem('Registro Salvo com Sucesso', '', 'success');
        }
        if ($idAlterar == -1) {
            inserir($idAgencia, $numeroConta);
        } else {
            alterar($idAgencia, $numeroConta);
        }
    });

    function alterar($idAgencia, $numeroConta) {
        $.ajax({
            url: '/cadastrocontacorrente/update',
            method: 'post',
            data: {
                id: $idAlterar,
                idAgencia: $idAgencia,
                numeroConta: $numeroConta
            },
            success: function (data) {
                $('#modal-cadastro-conta-corrente').modal('hide');
                $('.modal-backdrop').hide();
                debugger
                limparCampos();
                $idAlterar = -1;
                $tabelaCadastroContaCorrente.ajax.reload();
            }
        });
    }

    function limparCampos() {
        $(".modal-backdrop").hide();
        $('#cadastro-conta-corrente-campo-idAgencia').val("");
        $('#cadastro-conta-corrente-campo-numero-conta').val("");
        $idAlterar = -1;
    }
    $('#modal-cadastro-conta-corrente').on('hidden.bs.modal', function (e) {
        limparCampos();
    })
    function inserir($idAgencia, $numeroConta) {
        $.ajax({
            url: '/cadastrocontacorrente/cadastro',
            method: 'post',
            data: {
                IdAgencia: $idAgencia,
                NumeroConta: $numeroConta,
            },
            success: function (data) {
                limparCampos();
                $('#modal-cadastro-conta-corrente').modal('hide');
                $(".modal-backdrop").hide();
                $tabelaCadastroContaCorrente.ajax.reload();
            },
            error: function (err) {
            }
        });
    }

    $('.table').on("click", ".botao-editar", function () {
        $idAlterar = $(this).data("id");
        $.ajax({
            url: '/cadastrocontacorrente/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
                $('#cadastro-conta-corrente-campo-idAgencia').val(data.IdAgencia);
                $('#cadastro-conta-corrente-campo-numero-conta').val(data.NumeroConta);
                $("#modal-cadastro-conta-corrente").modal('show');
            },
            error: function (data) {
                alert("Não foi possível buscar o registro");
            }
        });
    });
});