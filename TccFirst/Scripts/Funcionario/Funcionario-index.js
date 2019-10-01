$(function () {
    $idAlterar = -1;

    $tabelaFuncionario = $('#funcionario-tabela').DataTable({
        "scrollX": true,
        ajax: '/Funcionario/obtertodos',
        serverSide: true,
        columns: [
            { data: 'Id' },
            { data: 'NomeFuncionario' },
            { data: 'TipoFuncionario' },
            { data: 'Usuario' },
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

    $('#funcionario-botao-salvar').on('click', function () {
        function monstrarMensagem(texto, titulo, tipo) {
            // Tipo -> error ,info, primary, success, default
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
        }
        $Nome = $('#funcionario-campo-nome').val();
        $TipoFuncionario = $('#funcionario-campo-tipo').val();
        $Usuario = $('#funcionario-campo-usuario').val();
        $Senha = $('#funcionario-campo-senha').val();
        //Validação
        if ($Nome == "") {
            monstrarMensagem('Digite o Nome', '', 'error');
            $('#funcionario-campo-nome').focus();
            return false;
        } else if ($TipoFuncionario == undefined) {
            monstrarMensagem('Selecione um Funcionário', '', 'error');
            $('#funcionario-campo-tipo').focus();
            return false;
        } else if ($Usuario == "") {
            monstrarMensagem('Digite uma Usuário', '', 'error');
            $('#funcionario-campo-usuario').focus();
            return false;
        }
        else if ($Senha == "") {
            monstrarMensagem('Digite uma senha', '', 'error');
            $('#funcionario-campo-senha').focus();
            return false;
        } else {
            monstrarMensagem('Registro Salvo com Sucesso', '', 'success');
        };


        if ($idAlterar == -1) {
            inserir($Nome, $TipoFuncionario, $Usuario, $Senha);
        } else {
            alterar($Nome, $TipoFuncionario, $Usuario, $Senha);
        }
    });

    $('#funcionario-tabela').on('click', '.botao-apagar', function () {
        $id = $(this).data('id');
        $.confirm({
            title: 'Deseja Realmente Apagar?',
            content: 'Clique no botão Apagar para apagar o registro',
            buttons: {
                Apagar: {
                    btnClass: 'btn-red any-other-class',
                    action: function () {
                        $.ajax({
                            url: '/Funcionario/apagar?id=' + $id,
                            method: 'get',
                            success: function (data) {
                                $tabelaFuncionario.ajax.reload();
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

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data("id");
        $.ajax({
            url: '/funcionario/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
                $('#funcionario-campo-nome').val(data.NomeFuncionario);
                $('#funcionario-campo-tipo').val(data.TipoFuncionario);
                $('#funcionario-campo-usuario').val(data.Usuario);
                $('#funcionario-campo-senha').val(data.Senha);
                $('#modal-funcionario').modal('show');
            },
            error: function (err) {
                alert('Não foi possível carregar');
            }
        });
    });

    function inserir($Nome, $TipoFuncionario, $Usuario, $Senha) {
        $.ajax({
            url: '/Funcionario/inserir',
            method: 'post',
            data: {
                NomeFuncionario: $Nome,
                TipoFuncionario: $TipoFuncionario,
                Usuario: $Usuario,
                Senha: $Senha
            },
            success: function (data) {
                LimparCampos(); 
                $('#modal-funcionario').modal('hide');
                $(".modal-backdrop").hide();
                $tabelaFuncionario.ajax.reload();
            },
            error: function (err) {
              
            }
        });
    }

    function alterar($Nome, $TipoFuncionario, $Usuario, $Senha) {
        $.ajax({
            url: "/Funcionario/update",
            method: "post",
            data: {
                NomeFuncionario: $Nome,
                TipoFuncionario: $TipoFuncionario,
                Usuario: $Usuario,
                Senha: $Senha,
                id: $idAlterar
            },
            success: function (data) {
                $("#modal-funcionario").modal("hide");
                LimparCampos();
                $idAlterar = -1;
                $tabelaFuncionario.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    }

    function LimparCampos() {
        $('#funcionario-campo-nome').val("");
        $('#funcionario-campo-tipo').val("");
        $('#funcionario-campo-usuario').val("");
        $('#funcionario-campo-senha').val("");
        $idAlterar = -1;
    };

    $('#modal-funcionario').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })
});
$(function () {

    // Ao pressionar o botão enter focar no próximo campo
    // 37 --> Esquerda
    // 38 --> cima
    // 39 --> Direita
    // 40 --> baixo
    $('#funcionario-campo-nome').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40) { // Enter ou seta p/ baixo
            $('#funcionario-campo-tipo').focus();
        } else if (e.keyCode == 39) {
            $('#funcionario-campo-tipo').focus();
        }
    });
    $('#funcionario-campo-tipo').keyup(function (e) {
        if (e.keyCode == 13) { // Enter ou seta p/ baixo
            $('#funcionario-campo-usuario').focus();
        } else if (e.keyCode == 39) {
            $('#funcionario-campo-usuario').focus(); // direita
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#funcionario-campo-nome').focus(); // esquerda
        }
    });
    $('#funcionario-campo-usuario').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) { 
            $('#funcionario-campo-senha').focus();
        } else if (e.keyCode == 40) {
            $('#funcionario-botao-salvar').focus;
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#funcionario-campo-tipo').focus(); // esquerda
        }
    });
    $('#funcionario-campo-senha').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) { // Enter ou seta p/ baixo
            $('#funcionario-botao-salvar').focus();
        } else if (e.keyCode == 40) {
            $('#funcionario-botao-salvar');
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#funcionario-campo-usuario').focus(); // esquerda
        }
    });
    $('#funcionario-botao-salvar').keyup(function (e) {
           if (e.keyCode == 37 || e.keyCode == 38) {
            $('#funcionario-campo-senha').focus(); // esquerda
        }
    });
});