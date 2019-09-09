﻿$(function () {
    $idAlterar = -1;

    $tabelaHistorico = $("#historico-tabela").Datatable({

        ajax: '/historico/obtertodos',
        serverSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'Descricao' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'
                }
            }
        ]
    });

    $('#historico-botao-salvar').on('click', function () {
        $descricao = ('#historico-campo-descricao').val();

        if ($idAlterar == -1) {
            inserir($descricao);
        } else {
            alterar($descricao);
        }
    });

    function alterar($descricao) {

        $ajax({
            url: "/historico/update",
            method: "post",
            data: {
                id: $idAlterar,
                descricao: $descricao
            },
            success: function (data) {
                $("#modal-historico").modal("hide");
                $idAlterar = -1;
                $tabelaHistorico.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel alterar");
            }
        });
    }

    function inserir($descricao)
    $ajax({
        url: "/historico/update",
        method: "post",
        data: {           
            Descricao: $descricao
        },
        success: function (data) {
            $('#modal-historico').modal('hide');
            $(".modal-backdrop").hide();
            $tabelaHistorico.ajax.reload();
        },
        error: function (err) {
            alert("Não foi possivel cadastrar")
        }
    });
    $('.table').on('click', '.botao-apagar', function () {
        $idApagar = $(this).data('id');

        $.ajax({
            url: "/historico/apagar?id=" + $idApagar,
            method: 'get',
            success: function (data) {
                $tabelaHistorico.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possivel apagar');
            }
        });
    });

    $('.table').on('click', '.botao-editar', function () {

        $idAlterar = $(this).data('id');

        $.ajax({
            url: "/historico/obterpeloid?id=" + $idAlterar,
            method: 'get',
            success: function (data) {
                $descricao = ('#historico-campo-descricao').val(data.Descricao);
                $('#modal-historico').modal('show');
            },
             error: function (err) {
                alert("Não foi possivel editar")
            }
        });
    });
});