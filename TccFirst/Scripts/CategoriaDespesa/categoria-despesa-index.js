﻿$(function () {
    $idAlterar = -1;

    $tabelaCategoriaDespesa = $('#categoria-despesa-tabela').DataTable({
        "scrollX": true,
        ajax: '/categoriadespesa/obterTodos',
        serverSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'TipoCategoriaDespesa' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'

                }

            }

        ]
    });

    $('#categoria-despesa-botao-salvar').on('click', function () {
        $categoriaDespesa = $('#categoria-despesa-campo-despesa').val();

        if ($idAlterar == -1) {
            inserir($categoriaDespesa);
        } else {
            alterar($categoriaDespesa);
        }
    });

    function alterar($categoriaDespesa) {
        $.ajax({
            url: "/categoriadespesa/alterar",
            method: "post",
            data: {
                id: $idAlterar,
                TipoCategoriaDespesa: $categoriaDespesa
            },
            success: function (data) {
                $("#modal-categoria-despesa").modal("hide");
                $idAlterar = -1;
                $tabelaCategoriaDespesa.ajax.reload();
            },
            error: function (err) {
                alert("Moisés");
            }
        })
    }

    function inserir($categoriaDespesa) {
        $.ajax({
            url: '/categoriadespesa/inserir',
            method: 'post',
            data: {
                TipoCategoriaDespesa: $categoriaDespesa,
            },
            success: function (data) {
                LimparCampos();
                $('#modal-categoria-despesa').modal('hide');
                $(".modal-backdrop").hide();
                $tabelaCategoriaDespesa.ajax.reload();
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
                            url: '/categoriadespesa/apagar?id=' + $idApagar,
                            method: 'get',
                            success: function (data) {
                                $tabelaCategoriaDespesa.ajax.reload();
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
            url: '/categoriadespesa/obterpeloid?id=' + $idAlterar,
            method: 'get',

            success: function (data) {
                $('#categoria-despesa-campo-despesa').val(data.TipoCategoriaDespesa);
                $('#modal-categoria-despesa').modal('show');
            },
            error: function (err) {
                alert('não foi possível carregar');
            }
        });
    });
    function LimparCampos() {
        $("#categoria-despesa-campo-despesa").val("");
        $idAlterar = -1;
    }
    $('#modal-categoria-despesa').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })
});