﻿$(function () {
    $idAlterar = -1;

    $tabelaAgencia = $('#agencia-cadastro').DataTable({
        "scrollX": true,
        ajax: 'Agencia/obtertodos',
        serverSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'Banco' },
            { 'data': 'NomeAgencia' },
            { 'data': 'NumeroAgencia' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'

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
    });
    //$(function keyup() {
    //    // Ao pressionar o botão enter focar no próximo campo
    //    $("#campo-banco").keyup(function (e) {
    //        if (e.keyCode == 13)
    //            $("#campo-nomeAgencia").focus();
    //    });
    //    $("#campo-nomeAgencia").keyup(function (e) {
    //        if (e.keyCode == 13)
    //            $("#campo-numeroAgencia").focus();
    //    });
    //    $("#campo-numeroAgencia").keyup(function (e) {
    //        if (e.keyCode == 13)
    //            $("#botao-salvar").focus();
    //    });
    //});
        
});
