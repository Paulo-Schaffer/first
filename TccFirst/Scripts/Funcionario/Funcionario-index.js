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

    $('#funcionario-botao-salva').on('click', function () {
        $nome = $('#funcionario-campo-nome').val();
        $tipo = $('#funcionario-campo-tipo').val();

        if ($idAlterar == -1) {
            inserir($nome, $tipo);
        } else {
            alterar($nome, $tipo);
        }
    });

    function alterar($nome, $cpf) {
        $.ajax({
            url: "/Funcionario/update",
            method: "post",
            data: {
                id: $idAlterar,
                nome: $nome,
                tipo: $tipo
            },
            success: function (data) {
                $("#modal-funcionario").modal("hide");
                $idAlterar = -1;
                $tabelaPessoa.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    }

    function inserir($nome, $tipo) {
        $.ajax({
            url: '/Funcionario/inserir',
            method: 'post',
            data: {
                nome: $nome,
                tipo: $tipo
            },
            success: function (data) {
                $('#modal-funcionario').modal('hide');
                $tabelaPessoa.ajax.reload();
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
                $('#funcionario-campo-tipo').val(data.Tipo);
                $('#modal-funcionario').modal('show');
            },
            error: function (err) {
                alert('não foi possível carregar');
            }
        });
    });
});