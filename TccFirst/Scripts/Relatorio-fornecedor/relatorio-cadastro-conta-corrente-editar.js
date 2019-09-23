$(function () {
    $idAlterar = -1;

    $tabelaCadastroContaCorrente = $('#relatorio-modal-cadastro-conta-corrente').DataTable({
        ajax: '/cadastrocontacorrente/ObterTodos',
        serverSide: true,
        columns: [
            { data: "Id" },
            { data: "IdAgencia" },
            { data: "NumeroConta" },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar ml-2" data-id="' + row.Id + '">Apagar</button>'
                }
            }
        ]
    });


    //$(document).ready(function () {
    //    $('#relatorio-modal-cadastro-conta-corrente').DataTable({
    //        dom: 'Bfrtip',
    //        buttons: [
    //            'copy', 'csv', 'excel', 'pdf', 'print'
    //        ]
    //    });
    //});