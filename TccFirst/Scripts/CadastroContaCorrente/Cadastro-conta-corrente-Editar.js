$(function () {
    $idAlterar = -1;

    $tabelaCadastroContaCorrente = $('#cadastro-conta-corrente-tabela').DataTable({
        ajax: '/cadastrocontacorrente/obtertodos',
        serverSide: true,
        Columns: [
            { 'data': 'Id' }, 
            //{ 'data': 'IdAgencia' },
            //{ 'data': 'NumeroConta' },
            {
                render: function (data, type, row) {
                    return "\
                    <button class='btn btn-primary botao-editar fa fa-edit'\
                        data-id=" + row.Id + "> Editar</button>\
                    <button class='btn btn-danger botao-apagar fa fa-trash'\
                        data-id=" + row.Id + "> Apagar</button>";
                }
            }
        ]
    });


    $("#cadastro-conta-corrente-tabela").on("click", ".botao-apagar", function () {
        $id = $(this).data("id");
        $.ajax({
            url: '/cadastrocontacorrente/apagar?id=' + $id,
            method: "get",
            success: function (data) {
                $tabelaCadastroContaCorrente.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possível apagar');
            }
        });
    });


    $('#cadastro-conta-corrente-botao-salvar').on('click', function () {
        $IdAgencia = $('#cadastro-conta-corrente-campo-idAgencia').val();
        $NumeroConta = $('#cadastro-conta-corrente-campo-numero-conta').val();
        if ($idAlterar == -1) {
            inserir($IdAgencia, $NumeroConta);
        } else {
            alterar($IdAgencia, $NumeroConta);
        }
    });

    function inserir($IdAgencia, $NumeroConta) {
        $.ajax({
            url: '/cadastrocontacorrente/cadastro',
            method: 'post',
            data: {
                IdAgencia: $IdAgencia,
                NumeroAgencia: $NumeroConta
            },
            success: function (data) {
                limparCampos();
                $('#modal-cadastro-conta-corrente').modal('hide');
                $(".modal-backdrop").hide();
                $tabelaCadastroContaCorrente.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível cadastrar");
            }
        });
    }

    $('.table').on("click", ".botao-editar", function () {
        $id = $(this).data("id");
        $.ajax({
            url: '/cadastrocontacorrente/obterpeloid?id=' + $id,
            method: 'get',
            success: function (data) {
                $idAlterar = $id;
                $('#cadastro-conta-corrente-campo-idAgencia').val(data.IdAgencia);
                $('#cadastro-conta-corrente-campo-numero-conta').val(data.NumeroConta );
            },
            error: function (data) {
                alert("Não foi possível buscar o registro");
            }
        });//pornto e virgula?

    });




    function alterar($IdAgencia, $NumeroConta) {
        S.ajax({
            url: '/cadastrocontacorrente/editar',
            method: 'post',
            data: {
                IdAgencia: $IdAgencia,
                NumeroConta: $NumeroConta,
                id : $idAlterar,
            },
            success: function (data) {
                limparCampos();
                $('#modal-cadastro-conta-corrente').modal('hide');
                $(".modal-backdrop").hide();
                $tabelaCadastroContaCorrente.ajax.reload();
            }
        });
    }

    function limparCampos() {
        $('#cadastro-conta-corrente-campo-idAgencia').val("");
        $('#cadastro-conta-corrente-campo-numero-conta').val("");
        $idAlterar = -1;
    }
});