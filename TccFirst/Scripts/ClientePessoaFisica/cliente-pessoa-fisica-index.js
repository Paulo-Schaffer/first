$(function () {
    $idAlterar = -1;

    
    $tabelaClientePessoaFisica = $("#cliente-pessoa-fisica-tabela").DataTable({
        ajax: '/ClientePessoaFisica/obtertodos',
        severSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'Nome' },
            { 'data': 'Cpf' },
            {
                render: function (data, type, row) {
                    return moment(row.DataNascimento).format('DD/MM/YYYY')
                }
            },
            { 'data': 'LimiteCredito' },
            { 'data': 'Email' },
            { 'data': 'Telefone' },
            { 'data': 'Cep' },
            { 'data': 'Numero' },
            { 'data': 'Bairro' },
            { 'data': 'Cidade' },
            { 'data': 'Uf' },
            { 'data': 'Complemento' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar"data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'

                }
            }
        ]
    });
    $('#clientePessoaFisica-batao-salvar').on('click', function () {
        $nome = $('#clientePessoaFisica-nome-campo').val();
        $cpf = $('#clientePessoaFisica-campo-cpf').val();
        $dataNascimento = $('#clientePessoaFisica-campo-dataNascimento').val();
        $limiteCredito = $('#clientePessoaFisica-campo-limiteCredito').val();
        $email = $('#clientePessoaFisica-campo-email').val();
        $telefone = $('#clientePessoaFisica-campo-telefone').val();
        $cep = $('#clientePessoaFisica-campo-cep').val();
        $numero = $('#clientePessoaFisica-campo-numero').val();
        $bairro = $('#clientePessoaFisica-campo-bairro').val();
        $cidade = $('#clientePessoaFisica-campo-cidade').val();
        $uf = $('#clientePessoaFisica-campo-uf').val();
        $complemento = $('#clientePessoaFisica-campo-complemento').val();

        if ($idAlterar == -1) {
            inserir($nome, $cpf, $dataNascimento, $limiteCredito, $email, $telefone, $cep, $numero, $bairro, $cidade, $uf, $complemento);
        } else {
            alterar($nome, $cpf, $dataNascimento, $limiteCredito, $email, $telefone, $cep, $numero, $bairro, $cidade, $uf, $complemento);
        }
    });

    function alterar($nome, $cpf, $dataNascimento, $limiteCredito, $email, $telefone, $cep, $numero, $bairro, $cidade, $uf, $complemento) {
        $.ajax({
            url: "/clientePessoaFisica/update",
            method: "post",
            data: {
                id: $idAlterar,
                nome: $nome,
                cpf: $cpf,
                dataNascimento: $dataNascimento,
                limiteCredito: $limiteCredito,
                email: $email,
                telefone: $telefone,
                cep: $cep,
                numero: $numero,
                bairro: $cidade,
                uf: $uf,
                complemento: $complemento
            },
            success: function (data) {
                $("#modal-clientePessoaFisica").modal("hide");
                $idAlterar = -1;
                $tabela.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    }

    function inserir($nome, $cpf, $dataNascimento, $limiteCredito, $email, $telefone, $cep, $numero, $bairro, $cidade, $uf, $complemento) {
        $.ajax({
            url: '/clientePessoaFisica/inserir',
            method: 'post',
            data: {
                Nome: $nome,
                Cpf: $cpf,
                DataNascimento: $dataNascimento,
                LimiteCredito: $limiteCredito,
                Email: $email,
                Telefone: $telefone,
                Cep: $cep,
                Numero: $numero,
                Bairro: $bairro,
                Cidade: $cidade,
                Uf: $uf,
                Complemento: $complemento
            },
            success: function (data) {
                $('#modal-clientePessoaFisica').modal('hide');
                $tabelaClientePessoaFisica.ajax.reload();
            },
            error: function (err) {

            }
        });
    }

    $('.table').on('click', '.botao-apagar', function () {
        $idApagar = $(this).data('id');

        $.ajax({
            url: '/clientePessoaFisica/apagar?id=' + $idApagar,
            method: 'get',
            success: function (data) {
                $tabelaClientePessoaFisica.ajax.reload();
            },

            error: function (err) {
                alert('Não foi possível apagar');
            }

        });
    });

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');

        $.ajax({
            url: '/clientePessoaFisica/obterpeloid?id=' + $idAlterar,
            method: 'get',

            success: function (data) {
                $('#clientePessoaFisica-campo-nome').val(data.Nome);
                $('#clientePessoaFisica-campo-cpf').val(data.CPF);
                $('#clientePessoaFisica-campo-dataNascimento').val(data.DataNascimento);
                $('#clientePessoaFisica-campo-limiteCredito').val(data.LimiteCredito);
                $('#clientePessoaFisica-campo-email').val(data.Email);
                $('#clientePessoaFisica-campo-telefone').val(data.Telefone);
                $('#clientePessoaFisica-campo-cep').val(data.Cep);
                $('#clientePessoaFisica-campo-numero').val(data.Numero);
                $('#clientePessoaFisica-campo-bairro').val(data.Bairro);
                $('#clientePessoaFisica-campo-cidade').val(data.Cidade);
                $('#clientePessoaFisica-campo-uf').val(data.Uf);
                $('#clientePessoaFisica-campo-complemento').val(data.Complemento);
                $('#modal-clientePessoaFisica').modal('show');
            },
            error: function (err) {
                alert('não foi possível carregar');
            }
        });
    });
});