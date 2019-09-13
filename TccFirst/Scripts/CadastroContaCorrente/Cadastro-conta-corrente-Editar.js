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
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'
                }
            }
        ]
    });


    $("#cadastro-conta-corrente-tabelaa").on("click", ".botao-apagar", function () {
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
        $idAgencia = $('#cadastro-conta-corrente-campo-idAgencia').val();
        $numeroConta = $('#cadastro-conta-corrente-campo-numero-conta').val();
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
        $.ajax({
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
        });//pornto e virgula?

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