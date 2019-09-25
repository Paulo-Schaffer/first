$(function () {
    $idAlterar = -1;

    $tabelaHistorico = $("#historico-tabela").DataTable({

        ajax: '/historico/obtertodos',
        severSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'Descricao' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar fa fa-pencil-square-o" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger fa fa-trash botao-apagar ml-2" data-id="' + row.Id + '">Apagar</button>'
                }
            }
        ]

    });

    $('#historico-botao-salvar').on('click', function () {
        if ($.trim($('#historico-campo-descricao').val()) == "") {
            alert("Preencha o campo Descrição");
            $('#historico-campo-descricao').focus();
            return false;
        } else {
            $('.alert').alert("");
        }
        $descricao = $('#historico-campo-descricao').val();

        if ($idAlterar == -1) {
            inserir($descricao);
        } else {
            alterar($descricao);
        }
    });

    function alterar($descricao) {

        $.ajax({
            url: "/historico/update",
            method: "post",
            data: {
                id: $idAlterar,
                descricao: $descricao
            },
            success: function (data) {
                $("#modal-historico").modal("hide");
                LimparCampos();
                $tabelaHistorico.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel alterar");
            }
        });
    }

    function inserir($descricao) {
        $.ajax({
            url: "/historico/inserir",
            method: "post",
            data: {
                Descricao: $descricao
            },
            success: function (data) {
                LimparCampos();
                $('#modal-historico').modal('hide');
                $(".modal-backdrop").hide();
                $tabelaHistorico.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel cadastrar")
            }
        });
    }

    $('.table').on('click', '.botao-apagar', function () {
        confirma = confirm("Deseja Realmente Apagar?")
        if (confirma == true) {
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
        }

    });

    $('.table').on('click', '.botao-editar', function () {

        $idAlterar = $(this).data('id');

        $.ajax({
            url: "/historico/obterpeloid?id=" + $idAlterar,
            method: 'get',
            success: function (data) {
                $('#historico-campo-descricao').val(data.Descricao);
                $('#modal-historico').modal('show');
            },
            error: function (err) {
                alert("Não foi possivel editar")
            }
        });
    });
    function LimparCampos() {
        $('#historico-campo-descricao').val("");
        $idAlterar = -1;
    }

    $('#modal-historico').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })
});
