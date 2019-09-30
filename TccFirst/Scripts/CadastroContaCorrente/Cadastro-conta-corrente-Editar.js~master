$(function () {

    // Ao pressionar o botão enter focar no próximo campo
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

    $tabelaCadastroContaCorrente = $('#cadastro-conta-corrente').DaraTable({
        ajax: '/CadastroContaCorrente/ObterTodos',
        serverSide: true,
        Columns: [
            { 'data': 'Id' },
            { 'data': 'IdAgencia' },
            { 'data': 'NumeroConta' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '" id="botao-editar"><i class="fa fa-edit"></i>Editar</button>\<button class="btn btn-danger botao-apagar ml-2" data-id="' + row.Id + '" id="botao-apagar"><i class="fa fa-trash"></i>Apagar</button>'
                }
            }
        ]
    });


    $("#cadastro-conta-corrente-tabelaa").on("click", ".botao-apagar", function () {
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
            // Tipo -> error ,info, primary, success, default
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
        }
        $IdAgencia = $('#cadastro-conta-corrente-campo-idAgencia').val();
        $NumeroConta = $('#cadastro-conta-corrente-campo-numero-conta').val();
        //Validação
        if ($IdAgencia == undefined) {
            monstrarMensagem('Selecione uma Agência', '', 'error');
            $('#cadastro-conta-corrente-campo-idAgencia').select2('open');
            return false;
        } else if ($NumeroConta == "") {
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

    function inserir($idAngecia, $numeroConta) {
        $.ajax({
            url: '/CadastroContaCorrete/cadastro',
            method: 'post',
            data: {
                idagencia: $idAngecia,
                numeroAgencia: $numeroConta
            },
            success: function (data) {
                limparCampos();
                $('#modal-cadastro-conta-corrente').modal('hide');
                $(".modal-backdrop").hide();
                $tabelaCadastroContaCorrente.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível cadastrar");
            }
        });
    }

    $('.table').on("click", ".botao-editar", function () {
        $id = $(this).data("id");
        $.ajax ({
            url: '/cadastrocontacorrente/obterpeloid?id=' + $id,
            method: 'get',
            success: function (data) {
                $idAlterar = $id;
                $('#cadastro-conta-corrente-campo-idAgencia').val(data.idagencia);
                $('#cadastro-conta-corrente-campo-numero-conta').val(data.numeroAgencia);
            },
            error: function (data) {
                alert("Não foi possível buscar o registro");
            }
        })//pornto e virgula?

    });




    function alterar($idAgencia, $numeroConta) {
        S.ajax({
            url: 'cadastrocontacorrente/alterar',
            method: 'post',
            data: {
                id= $idAlterar,
                idagencia = $idAgencia,
                numeroConta = $numeroConta
            },
            success: function (data) {
                $('#modal-cadastro-conta-corrente').modal('hide');
                limparCampos();
                $idAlterar = -1;
                $(".modal-backdrop").hide();
                $tabelaCadastroContaCorrente.ajax.reload();
            }
        });
    }

    function limparCampos() {
        $('#cadastro-conta-corrente-campo-idAgencia').val(null);
        $('#cadastro-conta-corrente-campo-numero-conta').val("");
        $idAlterar = -1;
    }
    $('#modal-cadastro-conta-corrente').on('hidden.bs.modal', function (e) {
        limparCampos();
    })
});