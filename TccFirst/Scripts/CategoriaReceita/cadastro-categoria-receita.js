$(function () {
    $idAlterar = -1;

    $tabelaCategoriaReceita = $('#categoria-receita-tabela').DataTable({
        ajax: '/categoriareceita/obterTodos',
        serverSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'TipoCategoriaReceita' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" id="botao-editar" data-id="' + row.Id + '"><i class="fa fa-edit"></i>Editar</button>\<button class="btn btn-danger botao-apagar" id="botao-apagar" data-id="' + row.Id + '"><i class="fa fa-trash"></i>Apagar</button>'

                }

            }

        ]
    });

    $('#categoria-receita-botao-salvar').on('click', function () {
        $categoriaReceita = $('#categoria-receita-campo-receita').val();
        function monstrarMensagem(texto, titulo, tipo) {
            // Tipo -> error ,info, primary, success, default
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
        }
        if ($categoriaReceita == '') {
            monstrarMensagem('Digite a Categoria Receita', '', 'error');
            $('#categoria-receita-campo-receita').focus();
            return false;
        } else {
            monstrarMensagem('Registro Salvo Com Sucesso', '', 'success');
        };

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
                LimparCampos();
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

    function LimparCampos() {
        $("#categoria-receita-campo-receita").val("");
        $idAlterar = -1;
    }

    $('#modal-categoria-receita').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })

});