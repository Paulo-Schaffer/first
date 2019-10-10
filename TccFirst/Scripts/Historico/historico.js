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
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '" id="botao-editar""><i class="fa fa-edit"></i>Editar</button>\<button class="btn btn-danger  botao-apagar ml-2" data-id="' + row.Id + '"id="botao-apagar"><i class="fa fa-trash"></i>Apagar</button>'
                }
            }
        ]
    });

    $('#historico-botao-salvar').on('click', function () {
        $descricao = $('#historico-campo-descricao').val();
        function mostrarMensagem(texto, titulo, tipo) {
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
        }
       
        if ($descricao == "") {
            mostrarMensagem('Digite a Descrição', '', 'error');
            $("#historico-campo-descricao").focus();
            return false;
        } else {
            mostrarMensagem('Registro Salvo com Sucesso', '', 'success');
        };

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
        $idApagar = $(this).data('id');
        $.confirm({
            title: 'Deseja Realmente Apagar?',
            content: 'Clique no botão apagar para apagar o registro',
            buttons: {
                Apagar: {
                    btnClass: 'btn-red any-other-class',
                    action: function () {

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
                },
                 cancelar: function () {
                },
            }
        });
        
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