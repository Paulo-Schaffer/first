$(function () {
    $idAlterar = -1;

    $tabelaAgencia = $('#agencia-index').DataTable({
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
});