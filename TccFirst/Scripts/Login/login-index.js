$(function () {
    $idAlterar = -1;

    $tabelaLogin = $('#login-tabela').DataTable({
        ajax: '/login/obtertodos',
        serverSide: true,
        columns: [
            { data : 'Funcionario'}
            { data : 'Id' },
            { data : 'Usuario' },
            { data : 'Senha' },
            {
                render: function (data, type, row) {
                    return "\
                    <button class='btn btn-primary botao-editar fa fa-edit'\
                        data-id=" + row.Id + "> Editar</button>\
                    <button class='btn btn-danger botao-apagar fa fa-trash'\
                        data-id=" + row.Id + "> Apagar</button>";
                }
            }
        ]
    });

    $('#login-tabela').on('click', '.botao-apagar', function () {
        confirma = confirm("Deseja realmente apagar?");
        if (confirma == true) {
            $id = $(this).data('id');
            $.ajax({
                url: '/login/apagar?id=' + $id,
                method: 'get',
                success: function (data) {
                    $tabelaLogin.ajax.reload();
                },
                error: function (err) {
                    alert('Não foi possível apagar');
                }

            });
        }
    });

    $('#login-botao-salvar').on('click', function () {
        $Usuario = $('#login-campo-usuario').val();
        $Senha = $('#login-campo-senha').val();
        $idFuncionario = $('#modal-login-funcionario')

        if ($idAlterar == -1) {
            inserir($Usuario, $Senha);
        } else {
            alterar($Usuario, $Senha);
        }
    });

    function inserir($Usuario, $Senha, $IdFuncionario) {
        $.ajax({
            url: '/login/inserir',
            method: 'post',
            data: {
                Usuario: $Usuario,
                Senha: $Senha,
                IdFuncionario: $IdFuncionario
            },
            success: function (data) {
                $('#modal-login').modal('hide');
                $tabelaLogin.ajax.reload();
            },
            error: function (err) {

            }
        });
    }

    function alterar($Usuario, $Senha, $IdFuncionario) {
        $.ajax({
            url: "/login/update",
            method: "post",
            data: {
                Id: $IdAlterar,
                Usuario: $Usuario,
                Senha: $Senha,
                IdFuncionario: $IdFuncionario
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

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');

        $.ajax({
            url: '/Login/obterpeloid?id=' + $idAlterar,
            method: 'get',

            success: function (data) {
                $('#login-campo-fornecedor').val(data..fun)
                $('#login-campo-usuario').val(data.usuario);
                $('#login-campo-senha').val(data.senha);
                $('#modal-login').modal('show');
            },
            error: function (err) {
                alert('não foi possível carregar');
            }
        });
    });
});