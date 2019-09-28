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

    $tabelaCadastroContaCorrente =$('#cadastro-conta-corrente-tabela').DataTable({
        ajax: '/cadastrocontacorrente/ObterTodos',
        serverSide: true,
        columns: [
            { data: "Id" },
            { data: "IdAgencia" },
            { data: "NumeroConta" },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar ml-2" data-id="' + row.Id + '">Apagar</button>'
                }
            }
        ]
    });


    $("#cadastro-conta-corrente-tabela").on("click", ".botao-apagar", function () {
        $id = $(this).data("id");
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
            inserir($IdAgencia, $NumeroConta);
        } else {
            alterar($IdAgencia, $NumeroConta);
            //alert('sadds');
        }

    });

    function inserir($IdAgencia, $NumeroConta) {
        $.ajax({
            url: '/cadastrocontacorrente/cadastro',
            method: 'post',
            data: {
                IdAgencia: $IdAgencia,
                NumeroConta: $NumeroConta
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


    function alterar($IdAgencia, $NumeroConta) {
        $.ajax({
            url: '/cadastrocontacorrente/editar',
            method: 'post',
            data: {
                id: $idAlterar,
                IdAgencia: $IdAgencia,
                NumeroConta: $NumeroConta
            },
            success: function (data) {
                limparCampos();
                $('#modal-cadastro-conta-corrente').modal('hide');
                $(".modal-backdrop").hide();
                $tabelaCadastroContaCorrente.ajax.reload();
            }
        });
    }

    function limparCampos() {
        $('#cadastro-conta-corrente-campo-idAgencia').val("");
        $('#cadastro-conta-corrente-campo-numero-conta').val("");
        $idAlterar = -1;
    }
});