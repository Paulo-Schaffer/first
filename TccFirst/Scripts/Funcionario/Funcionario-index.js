$(function () {
    $idAlterar = -1;

    $tabelaFuncionario = $('#funcionario-tabela').DataTable({
        ajax: '/Funcionario/obtertodos',
        serverSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'NomeFuncionario' },
            { 'data': 'TipoFuncionario' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'

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

    function alterar($nome, $tipo) {
        $.ajax({
            url: "/Funcionario/update",
            method: "post",
            data: {
                id: $idAlterar,
                NomeFuncionario: $Nome,
                TipoFuncionario: $Tipo
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

    function inserir($Nome, $Tipo) {
        $.ajax({
            url: '/Funcionario/inserir',
            method: 'post',
            data: {
                NomeFuncionario: $Nome,
                TipoFuncionario: $Tipo
            },
            success: function (data) {
                $('#modal-funcionario').modal('hide');
                LimparCampos();
                $tabelaFuncionario.ajax.reload();
            },
            error: function (err) {

            }
        });
    }

    $('.table').on('click', '.botao-apagar', function () {
        $idApagar = $(this).data('id');

        $.ajax({
            url: '/Funcionario/apagar?id=' + $idApagar,
            method: 'get',
            success: function (data) {
                $tabelaFuncionario.ajax.reload();
            },

            error: function (err) {
                alert('Não foi possível apagar');
            }

        });
    });

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');

        $.ajax({
            url: '/Funcionario/obterpeloid?id=' + $idAlterar,
            method: 'get',

            success: function (data) {
                $('#funcionario-campo-nome').val(data.NomeFuncionario);
                $('#funcionario-campo-tipo').val(data.TipoFuncionario);
                $('#modal-funcionario').modal('show');
            },
            error: function (err) {
                alert('não foi possível carregar');
            }
        });
    });

    function LimparCampos() {
        $('#funcionario-campo-nome').val("");
        $('#funcionario-campo-tipo').val("");
        $idAlterar = -1;
    };
});