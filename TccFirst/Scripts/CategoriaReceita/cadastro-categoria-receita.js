$(function () {
    $idAlterar = -1;

    $tabelaCategoriaReceita = $('#categoria-receita-tabela').DataTable({
        ajax: '/CategoriaReceita/obtertodos',
        serverSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'TipoCategoriaReceita' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'

                }

            }

        ]
    });

    $('#categoria-receita-botao-salvar').on('click', function () {
        $categoriaReceita = $('#categoria-receita-campo-receita').val();

        if ($idAlterar == -1) {
            inserir($categoriaReceita);
        } else {
            alterar($categoriaReceita);
        }
    });

    function alterar($categoriaReceita) {
        $.ajax({
            url: "/CategoriaReceita/update",
            method: "post",
            data: {
                id: $idAlterar,
                tipoReceita: $categoriaReceita
            },
            success: function (data) {
                $("#modal-categoria-receita").modal("hide");
                $idAlterar = -1;
                $tabelaCategoriaReceita.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    }

    function inserir($categoriaReceita) {
        $.ajax({
            url: '/CategoriaReceita/inserir',
            method: 'post',
            data: {
                categoriaReceita: $categoriaReceita,
            },
            success: function (data) {
                $('#modal-categoria-receita').modal('hide');
                $tabelaCategoriaReceita.ajax.reload();
            },
            error: function (err) {

            }
        });
    }

    $('.table').on('click', '.botao-apagar', function () {
        $idApagar = $(this).data('id');

        $.ajax({
            url: '/categoriareceita/apagar?id=' + $idApagar,
            method: 'get',
            success: function (data) {
                $tabelaCategoriaReceita.ajax.reload();
            },

            error: function (err) {
                alert('Não foi possível apagar');
            }

        });
    });

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');

        $.ajax({
            url: '/categoriareceita/obterpeloid?id=' + $idAlterar,
            method: 'get',

            success: function (data) {
                $('#categoria-receita-campo-receita').val(data.TipoReceita);
                $('#modal-pessoa').modal('show');
            },
            error: function (err) {
                alert('não foi possível carregar');
            }
        });
    });
});