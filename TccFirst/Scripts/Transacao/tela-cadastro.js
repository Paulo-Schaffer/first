$(function () {
    $idAlterar = -1;

    $tabelaAgencia = $('#transacao-tabela').DataTable({
        ajax: 'Transacao/obtertodos',
        serverSide: true,
        columns: [
            { 'data': 'Id               ' },
            { 'data': 'Conta Corrente   ' },
            { 'data': 'Historico        ' },
            { 'data': 'Categoria Receita' },
            { 'data': 'Categoria Despesa' },
            { 'data': 'Tipo Pagamento   ' },
            { 'data': 'Valor            ' },
            { 'data': 'Documento        ' },
            { 'data': 'Data Lançamento  ' },
            { 'data': 'Data Recebimento ' },
            { 'data': 'Data Descricao   ' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'
                }
            }
        ]
    });
    $('#botao-salvar').on('click', function () {
        function monstrarMensagem(texto, titulo, tipo) {
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
        }
        $Valor = $("contacorrente-campo-valor").val();

        if ($Valor == "") {
            monstrarMensagem('Digite o Nome do Banco', '', 'error');
            $("#contacorrente-campo-valor").focus();
            return false;
        }
    });
});