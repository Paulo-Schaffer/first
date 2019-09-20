$(function () {
    $idAlterar = -1;

    $tabelaLogin = $('#login-tabela').DataTable({
        ajax: '/login/obtertodos',
        serverSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'Usuario' },
            { 'data': 'Senha' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'

                }

            }

        ]
    });

    $('#login-botao-salvar').on('click', function () {
        $Nome = $('#modal-login-usuario').val();
        $Tipo = $('#modal-login-senha').val();
        $idFuncionario = $('#modal-login-funcionario')

        if ($idAlterar == -1) {
            inserir($Usuario, $Senha);
        } else {
            alterar($Usuario, $Senha);
        }
    });

    function alterar($usuario, $senha) {
        $.ajax({
            url: "/login/update",
            method: "post",
            data: {
                id: $idAlterar,
                usuario: $usuario,
                senha: $senha,
                idFuncionario: $idFuncionario
            },
            success: function (data) {
                $("#modal-login").modal("hide");
                $idAlterar = -1;
                $tabelaLogin.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    }

    function inserir($Usuario, $Senha) {
        $.ajax({
            url: '/Login/inserir',
            method: 'post',
            data: {
                usuario: $Usuario,
                senha: $Senha,
                idFuncionario: $idFuncionario
            },
            success: function (data) {
                $('#modal-login').modal('hide');
                $tabelaLogin.ajax.reload();
            },
            error: function (err) {

            }
        });
    }

    $('.table').on('click', '.botao-apagar', function () {
        $idApagar = $(this).data('id');

        $.ajax({
            url: '/Login/apagar?id=' + $idApagar,
            method: 'get',
            success: function (data) {
                $tabelaLogin.ajax.reload();
            },

            error: function (err) {
                alert('Não foi possível apagar');
            }

        });
    });

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');

        $.ajax({
            url: '/Login/obterpeloid?id=' + $idAlterar,
            method: 'get',

            success: function (data) {
                $('#modal-login-usuario').val(data.usuario);
                $('#modal-login-senha').val(data.senha);
                $('#modal-login').modal('show');
            },
            error: function (err) {
                alert('não foi possível carregar');
            }
        });
    });
});