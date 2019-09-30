$(function () {
    $idAlterar = -1;

    $tabelaCategoriaReceita = $('#categoria-receita-tabela').DataTable({
        "scrollX": true,
        ajax: '/categoriareceita/obterTodos',
        serverSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'TipoCategoriaReceita' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar ml-2 " data-id="' + row.Id + '">Apagar</button>'

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
            url: "/categoriareceita/update",
            method: "post",
            data: {
                id: $idAlterar,
                TipoCategoriaReceita: $categoriaReceita
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
            url: '/categoriareceita/inserir',
            method: 'post',
            data: {
                TipoCategoriaReceita: $categoriaReceita,
            },
            success: function (data) {
                $('#modal-categoria-receita').modal('hide');
                $(".modal-backdrop").hide();
                $tabelaCategoriaReceita.ajax.reload();
            },
            error: function (err) {

            }
        });
    }

    $('.table').on('click', '.botao-apagar', function () {
        $idApagar = $(this).data('id');

        $.confirm({
            title: 'Deseja Realmente Apagar?',
            content: 'Clique no botão apagar para apagar o registro',
            buttons: {
                Apagar: {
                    btnClass: 'btn-red any-other-class',
                    action: function () {
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
                    }
                },
                cancelar: function () {
                },
            }

        });

        
    });

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');

        $.ajax({
            url: '/categoriareceita/obterpeloid?id=' + $idAlterar,
            method: 'get',

            success: function (data) {
                $('#categoria-receita-campo-receita').val(data.TipoCategoriaReceita);
                $('#modal-categoria-receita').modal('show');
            },
            error: function (err) {
                alert('não foi possível carregar');
            }
        });
    });
});