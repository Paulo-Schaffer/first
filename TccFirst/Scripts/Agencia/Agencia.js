$(function () {
    $idAlterar = -1;

    $tabelaAgencia = $('#agencia-tabela').DataTable({
        ajax: '/Agencia/obtertodos',
        serverSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'Banco' },
            { 'data': 'NomeAgencia' },
            { 'data': 'NumeroAgencia' },
            {
                render: function (data, type, row) {
                    return "\
                   <a class='btn btn-primary botao-editar'\
                        href='/agencia/editar?id=" + row.Id + "'\
                        data-id=" + row.Id + "><i class='fa fa-edit'></i>Editar</a>\
                    <button class='btn btn-danger botao-apagar'\
                        data-id=" + row.Id + "><i class='fa fa-trash'></i>Apagar</button>";
                }
            }

        ]
    });
    $('#botao-salvar').on('click', function () {
        function monstrarMensagem(texto, titulo, tipo) {
            // Tipo -> error ,info, primary, success, default
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
        }
        $nomeBanco = $("#campo-banco").val();
        $nomeAgencia = $("#campo-nomeAgencia").val();
        $numeroAgencia = $("#campo-numeroAgencia").val();

        //Validação
        if ($nomeBanco == "") {
            monstrarMensagem('Digite o Nome do Banco', '', 'error');
            $("#campo-banco").focus();
            return false;
        } else if ($nomeAgencia == "") {
            monstrarMensagem('Digite o Nome da Agência', '', 'error');
            $("#campo-nomeAgencia").focus();
            return false;
        } else if ($numeroAgencia == "") {
            monstrarMensagem('Digite o Número da Agência', '', 'error');
            $("#campo-numeroAgencia").focus();
            return false;
        } else {

        }

        if ($idAlterar == -1) {
            inserir($nomeBanco, $nomeAgencia, $numeroAgencia);

        } else {
            alterar($nomeBanco, $nomeAgencia, $numeroAgencia);
        }

    });
    function alterar($nomeBanco, $nomeAgencia, $numeroAgencia) {
        $.ajax({
            url: "/agencia/update",
            method: "post",
            data: {
                id: $idAlterar,
                nomeBanco: $nomeBanco,
                nomeAgencia: $nomeAgencia,
                numeroagencia: $numeroAgencia
            },
            success: function (data) {

                LimparCampos();
                $idAlterar = -1;
                $tabelaAgencia.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    }
    function LimparCampos() {

        $("#campo-banco").val("");
        $("#campo-nomeAgencia").val("");
        $("#campo-numeroAgencia").val("");
        $idAlterar = -1;
    };
    function inserir($nomeBanco, $nomeAgencia, $numeroAgencia) {
        $.ajax({
            url: '/agencia/inserir',
            method: 'post',
            data: {
                NomeBanco: $nomeBanco,
                nomeAgencia: $nomeAgencia,
                NumeroAgencia: $numeroAgencia
            },
            success: function (data) {
                LimparCampos();
                $tabelaAgencia.ajax.reload();
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
                            url: '/agencia/apagar?id=' + $idApagar,
                            method: 'get',
                            success: function (data) {
                                $tabelaAgencia.ajax.reload();
                            },

                            error: function (err) {
                                alert('Não foi possível apagar');
                            },

                        });
                    }
                },
                cancelar: function () {
                },
            }

        });
    });
    $('.table').on('click', '.botao-editar', function () {
        debugger
        $idAlterar = $(this).data('id');

        $.ajax({
            url: '/agencia/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
                $("#campo-banco").val(data.NomeBanco);
                $("#campo-nomeAgencia").val(data.NomeAgencia);
                $("#campo-numeroAgencia").val(data.NumeroAgencia);
                $tabelaAgencia.ajax.reload();

            },
            error: function (err) {
                alert('não foi possível carregar');
            }
        });

    });

});
