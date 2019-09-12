$(function () {
    $idAlterar = -1;

    $tabelaCadastroContaCorrente = $('#cadastro-conta-corrente').DaraTable({
        ajax: '/CadastroContaCorrente/ObterTodos',
        serverSide: true,
        Columns: [
            { 'data': 'Id' },
            { 'data': 'IdAgencia' },
            { 'data': 'NumeroConta' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'
                }
            }
        ]
    })
});

$('#cadastro-conta-corrente-botao-salvar').on('click', function () {
    $idAgencia = $('#idAgencia').val();
    $numeroConta = $('#cadastro-conta-corrente-campo-numero-conta').val();
    if ($idAlterar == -1) {
        inserir($idAgencia, $numeroConta);
    } else {
        alterar($idAgencia, $numeroConta);
    }
});

function alterar($idAgencia, $numeroConta) {
    S.ajax({
        url: 'cadastrocontacorrente/obtertodos',
        method: 'post',
        data{
            id= $idAlterar,
            idagencia = $idAgencia,
            numeroConta = $numeroConta
        },
        success: function (data) {}

    });
}