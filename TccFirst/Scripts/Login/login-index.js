$(function () {
    $idAlterar = -1;

    $tabelaLogin = $("#login-tabela").DataTable({
        ajax: '/login/obtertodos',
        serverSide: true,
        columns: [
            { data: "Id" },
            { data: "Funcionario.NomeFuncionario" },
            { data: "Usuario" },
            { data: "Senha" },
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

    $('#login-botao-salvar').on('click', function () {
        $IdFuncionario = $('#login-campo-funcionario');
        $Usuario = $('#login-campo-usuario').val();
        $Senha = $('#login-campo-senha').val();

        if ($idAlterar == -1) {
            inserir($IdFuncionario, $Usuario, $Senha);
        } else {
            alterar($IdFuncionario, $Usuario, $Senha);
        }
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

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');

        $.ajax({
            url: '/Login/obterpeloid?id=' + $idAlterar,
            method: 'get',

            success: function (data) {
                $('#login-campo-funcionario').val(data.Funcionario);
                $('#login-campo-usuario').val(data.Usuario);
                $('#login-campo-senha').val(data.Senha);
                $('#modal-login').modal('show');
            },
            error: function (err) {
                alert('não foi possível carregar');
            }
        });
    });

    function inserir($IdFuncionario, $Usuario, $Senha) {
        $.ajax({
            url: '/login/cadastro',
            method: 'post',
            data: {
                IdFuncionario: $IdFuncionario,
                Usuario: $Usuario,
                Senha: $Senha
            },
            success: function (data) {
                LimparCampos();
                $('#modal-login').modal('hide');
                $tabelaLogin.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel cadastrar!")
            }
        });
    }

    function alterar($IdFuncionario, $Usuario, $Senha) {
        $.ajax({
            url: "/login/update",
            method: "post",
            data: {
                IdFuncionario: $IdFuncionario,
                Usuario: $Usuario,
                Senha: $Senha,
                id: $IdAlterar
            },
            success: function (data) {
                LimparCampos();
                $("#modal-login").modal("hide");
                $tabelaLogin.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    }

    function LimparCampos() {
        $('#login-campo-funcionario').val('')
        $('#login-campo-usuario').val('');
        $('#login-campo-senha').val('');
        $idAlterar = -1;
    }

    $('#modal-login').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })
});