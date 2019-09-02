$(function () {
    $idAlterar = -1;
    $tabelaAgencia = ('#agencia-tabela').DataTale({
        ajax: 'http://localhost:50838/Agencia/obtertodos',
        serverSide : true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'Banco' },
            { 'data': 'NomeAgencia' },
            { 'data': 'NumeroAgencia' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary agencia-botao-salvar" data-id="' + row.Id + '">Salvar</button>\<button class="btn btn-danger agencia-botao-cancelar" data-id="' + row.Id + '">Cancelar</button>'
                }
            }
        ]
    });
    $('#agencia-botao-salvar').on('click', function () {
        $banco = $("#agencia-campo-banco").val();
        $nomeAgencia = $('#agencia-campo-nomeagencia').val();
        $numeroAgencia = $("#agencia-campo-numeroagencia").val();

        if ($idAlterar == -1) {
            inserir($banco, $nomeAgencia, $numeroAgencia);
        }
        else {
            alterar($banco, $nomeAgencia, $numeroAgencia);
        }
        function alterar($banco, $nomeAgencia, $numeroAgencia) {
            $.ajax({
                url: 'http://localhost:50838/Agencia/Update',
                method: "post",
                data: {
                    id: $idAlterar,
                    banco: $banco,
                    nome: $nomeAgencia,
                    numero: $numeroAgencia
                },
                success: function (data) {
                    $('#modal-agencia').modal('hide');
                    $idAlterar = -1;
                    $tabelaAgencia.ajax.reload();
                },
                error: function (err) {
                    alert('Não foi possível alterar')
                }
            })
        }
        function inserir($banco, $nomeAgencia, $numeroAgencia) {
            $.ajax({
                url: 'http://localhost:50838/Agencia/Index',
                method: 'post',
                data: {
                    banco = $banco,
                    nome: $nomeAgencia,
                    numero: $numeroAgencia
                },
                success: function (data) {
                    $('#modal-agencia').modal('hide')
                },
                error: function (err) {
                    alert('Não foi possível inserir')
                }
            });

        });
    $('table').on('click', '.botao-cancelar', function () {
        $idApagar = $(this).data('id');
        $.ajax({
            url: 'http://localhost:50838/Agencia/apagar?id=' + $idApagar,
            method: 'get',
            success: function (data) {
                $tabelaAgencia.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível apagar")
            }
        });
    });

    $('table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');
        $.ajax({
            url: 'http://localhost:50838/Agencia/obterpeloid?id=' + $idAlterar,
            method: 'get',
            success: function (data) {
                $('#agencia-campo-banco').val(data.banco);
                $('#agencia-campo-nome_agencia').val(data.nome);
                $('#agencia-campo-numero_agencia').val(data.numero);
                $('#modal-agencia').modal('show');
            },
            error: function (err) {
                alert('Não foi possível carregar');

            }
        });


    });

});