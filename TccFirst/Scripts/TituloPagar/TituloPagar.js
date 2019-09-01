$(function () {
    $idAlterar = -1;

    $tabelaFuncionario = $('#funcionario-tabela').DataTable({
        ajax: 'http://localhost:50838/Funcionario/obtertodos',
        serverSide = true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'Nome' },
            { 'data': 'Tipo' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'
                }
            }
        ]
    });

    $('#funcionario-botao-salvar').on('Click', function () {
        $nome = $('#funcionario-campo-nome').val();
        $tipo = $('#funcionario-campo-tipo').val();

        if (idAlterar == -1) {
            inserir{ $nome, $tipo };
        } else {
            alterar{ $nome, $tipo };
        }
    });

    function alterar($nome, $tipo) {

        $.ajax({
            url: "http://localhost:50838/Funcionario/update",
            method: "post",
            data: {
                id = $idalterar,
                nome = $nome,
                tipo = $tipo
            },
            success: function (data) {
                $("#modal-funcionario").modal("hide");
                $idalterar = -1;
                $tabelafuncionario.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel alterar");
            }
        });
    }

    function inserir($nome, $tipo) {
        $.ajax({
            url: "http://localhost:50838/Funcionario/inserir",
            method: 'post',
            data: {
                nome: $nome,
                tipo = $tipo
            },
            success: function (data) {
                $('#modal-funcionario').modal('hide');
                $tabelafuncionario.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel cadastrar")
            }

        });
    }

    $('.table').on('click', '.botao-apagar', function () {
        $idApagar = $(this).data('id');

        $.ajax({
            url: "http://localhost:50838/Funcionario/obterpeloid?id=" + $idApagar,
            method: 'get',
            success: function (data) {
                $tabelaFuncionario.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possivel apagar');
            }
        })
    })

    $('.table').on('click', '.botao-editar', function () {
        $idApagar = $(this).data('id');

        $.ajax({
            url: "http://localhost:50838/Funcionario/obterpeloid?id=" + idAlterar,
            method: 'get',
            success: function (data) {
                $('#funcionario-campo-nome').val(data.nome);
                $('#funcionario-campo-tipo').val(data.tipo);
                $('#modal-funcionario').modal('show');
            },
            error: function (err) {
                alert("Não foi possivel editar")
            }
        });
    });
});
