$(function () {
    $idAlterar = -1;

    $tabelaFuncionario = $('#funcionario-tabela').DataTable({
        ajax: '/funcionario/obtertodos',
        serverSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'NomeFuncionario' },
            { 'data': 'TipoFuncionario' },
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
        $Nome = $('#funcionario-campo-nome').val();
        $Tipo = $('#funcionario-campo-tipo-funcionario').val();

        if ($idAlterar == -1) {
            inserir($Nome, $TipoFuncionario);
        } else {
            alterar($Nome, $TipoFuncionario);
        }
    });

    function alterar($Nome, $TipoFuncionario) {
        $.ajax({
            url: "/funcionario/update",
            method: "post",
            data: {
                id: $idAlterar,
                NomeFuncionario: $Nome,
                TipoFuncionario: $TipoFuncionario
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

    function inserir($Nome, $TipoFuncionario) {
        $.ajax({
            url: '/funcionario/inserir',
            method: 'post',
            data: {
                NomeFuncionario: $Nome,
                TipoFuncionario: $TipoFuncionario
            },
            success: function (data) {
                $('#modal-funcionario').modal('hide');
                LimparCampos();
                $tabelaFuncionario.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel inserir");
            }
        });
    }

    $('.table').on('click', '.botao-apagar', function () {
        confirma = confirm("Deseja realmente Apagar?");
        if (confirma == true) {
            $idApagar = $(this).data('id');
            $.ajax({
                url: '/funcionario/apagar?id=' + $idApagar,
                method: 'get',
                success: function (data) {
                    $tabelaFuncionario.ajax.reload();
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
            url: '/funcionario/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
                $('#funcionario-campo-nome').val(data.Nome);
                $('#funcionario-campo-tipo-funcionario').val(data.TipoFuncionario);
                $('#modal-funcionario').modal('show');
            },
            error: function (err) {
                alert('Não foi possível carregar');
            }
        });
    });

    function LimparCampos() {
        $('#funcionario-campo-nome').val("");
        $('#funcionario-campo-tipo-funcionario').val("");
        $idAlterar = -1;
    };

    $('#modal-funcionario').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })
});