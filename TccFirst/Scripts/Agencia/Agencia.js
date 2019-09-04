$(function () {
    $idAlterar = -1;

    $tabelaAgencia = $('#agencia-cadastro').DataTable({
        ajax: 'Agencia/obtertodos',
        serverSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'NomeBanco' },
            { 'data': 'NomeAgencia' },
            { 'data': 'NumeroAgencia' },
            {
               

            }

        ]
    });
   
