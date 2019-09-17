$(function () {
    $idAlterar = -1;

    $tabelaFuncionario = $('#funcionario-tabela').DataTable({
        ajax: '/Funcionario/obtertodos',
        serverSide: true,
        columns: [
            { data : 'Id' },
            { data : 'NomeFuncionario' },
            { data : 'TipoFuncionario' },
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
        $Tipo = $('#funcionario-campo-tipo').val();

        if ($idAlterar == -1) {
            inserir($Nome, $Tipo);
        } else {
            alterar($Nome, $Tipo);
        }
    });

    $('#funcionario-tabela').on('click', '.botao-apagar', function () {
        confirma = confirm("Deseja realmente Apagar?");
        if (confirma == true) {
            $id = $(this).data('id');
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
    });

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');
        $.ajax({
            url: '/Funcionario/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
                $('#funcionario-campo-nome').val(data.Nome);
                $('#funcionario-campo-tipo').val(data.Tipo);
                $('#modal-funcionario').modal('show');
            },
            error: function (err) {
                alert('Não foi possível carregar');
            }
        });
    });

    function inserir($Nome, $Tipo) {
        $.ajax({
            url: '/Funcionario/inserir',
            method: 'post',
            data: {
                NomeFuncionario: $Nome,
                TipoFuncionario: $Tipo
            },
            success: function (data) {
                LimparCampos(); 
                $('#modal-funcionario').modal('hide');
                $tabelaFuncionario.ajax.reload();
            },
            error: function (err) {
              
            }
        });
    }

    function alterar($Nome, $Tipo) {
        $.ajax({
            url: "/Funcionario/update",
            method: "post",
            data: {
                NomeFuncionario: $Nome,
                TipoFuncionario: $Tipo,
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
        $idAlterar = -1;
    };

    $('#modal-funcionario').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })
});