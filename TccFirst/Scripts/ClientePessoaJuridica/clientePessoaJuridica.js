$(function () {
    $idAlterar = -1;

    $tabelaClientePessoaJuridica = $('#clientePessoaJuridica-tabela').DataTable({
        ajax: 'http://localhost:50838/ClientePessoaJuridica/ObterTodos',
        serverSide = true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'Razão Social' },
            { 'data': 'Atividade' },
            { 'data': 'Nome Fantasia' },
            { 'data': 'Data Cadastro' },
            { 'data': 'CNPJ' },
            { 'data': 'E Mail' },
            { 'data': 'Filial' },
            { 'data': 'Telefone' },
            { 'data': 'CEP' },
            { 'data': 'Logradouro' },
            { 'data': 'Numero' },
            { 'data': 'Bairro' },
            { 'data': 'UF' },
            { 'data': 'Cidade' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'
                }
            }
        ]
    });
    $('#clientePessoaJuridica-botao-salvar').on('Click', function () {
        $razaoSocial: $('#clientePessoaJuridica-campo-razaoSocial').val();
        $atividade: $('#clientePessoaJuridica-campo-atividade').val();
        $nomeFantasia: $('#clientePessoaJuridica-campo-nomeFantasia').val();
        $dataCadastro: $('#clientePessoaJuridica-campo-dataCadastro').val();
        $cnpj: $('#clientePessoaJuridica-campo-cnpj').val();
        $email: $('#clientePessoaJuridica-campo-email').val();
        $filial: $('#clientePessoaJuridica-campo-filial').val();
        $telefone: $('#clientePessoaJuridica-campo-telefone').val();
        $cep: $('#clientePessoaJuridica-campo-cep').val();
        $logradouro: $('#clientePessoaJuridica-campo-logradouro').val();
        $numero: $('#clientePessoaJuridica-campo-numero').val();
        $bairro: $('#clientePessoaJuridica-campo-bairro').val();
        $uf: $('#clientePessoaJuridica-campo-uf').val();
        $cidade: $('#clientePessoaJuridica-campo-cidade').val();


        if (idAlterar == -1) {
            inserir($razaoSocial, $atividade, $nomeFantasia, $dataCadastro, $cnpj, $email, $filial, $telefone, $cep, $logradouro, $numero, $bairro, $uf, $cidade);
        } else {
            alterar($razaoSocial, $atividade, $nomeFantasia, $dataCadastro, $cnpj, $email, $filial, $telefone, $cep, $logradouro, $numero, $bairro, $uf, $cidade);
        }
    });
    function alterar($razaoSocial, $atividade, $nomeFantasia, $dataCadastro, $cnpj, $email, $filial, $telefone, $cep, $logradouro, $numero, $bairro, $uf, $cidade) {

        $.ajax({
            url: "http://localhost:50838/ClientePessoaJuridica/update",
            method: "post",
            data: {
                id: $idalterar,
                razaoSocial: $razaoSocial,
                atividade: $atividade,
                nomeFantasia: $nomeFantasia,
                dataCadastro: $dataCadastro,
                cnpj: $cnpj,
                email: $email,
                filial: $filial,
                telefone: $telefone,
                cep: $cep,
                logradouro: $logradouro,
                numero: $numero,
                bairro: $bairro,
                uf: $uf,
                cidade: $cidade
            },
            success: function (data) {
                $("#modal-clientePessoaJuridica").modal("hide");
                $idalterar = -1;
                $tabelaclientePessoaJuridica.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel alterar");
            }
        });
    }
    function inserir($razaoSocial, $atividade, $nomeFantasia, $dataCadastro, $cnpj, $email, $filial, $telefone, $cep, $logradouro, $numero, $bairro, $uf, $cidade) {
        $.ajax({
            url: "http://localhost:50838/ClientePessoaJuridica/Inserir",
            method: 'post',
            data: {

                razaoSocial: $razaoSocial,
                atividade: $atividade,
                nomeFantasia: $nomeFantasia,
                dataCadastro: $dataCadastro,
                cnpj: $cnpj,
                email: $email,
                filial: $filial,
                telefone: $telefone,
                cep: $cep,
                logradouro: $logradouro,
                numero: $numero,
                bairro: $bairro,
                uf: $uf,
                cidade: $cidade
            },
            success: function (data) {
                $('#modal-clientePessoaJuridica').modal('hide');
                $tabelaClientePessoaJuridica.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel cadastrar")
            }

        });
    }
    $('.table').on('click', '.botao-apagar', function () {
        $idApagar = $(this).data('id');

        $.ajax({
            url: "http://localhost:50838/ClientePessoaJuridica/Apagar?id=" + $idApagar,
            method: 'get',
            success: function (data) {
                $tabelaclientePessoaJuridica.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possivel apagar');
            }
        })
    })
    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');

        $.ajax({
            url: "http://localhost:50838/ClientePessoaJuridica/obterpeloid?id=" + idAlterar,
            method: 'get',
            success: function (data) {
                $('#clientePessoaJuridica-campo-razaoSocial').val(data.razaoSocial);
                $('#clientePessoaJuridica-campo-atividade').val(data.atividade);
                $('#clientePessoaJuridica-campo-nomeFantasia').val(data.nomeFantasia);
                $('#clientePessoaJuridica-campo-dataCadastro').val(data.dataCadastro);
                $('#clientePessoaJuridica-campo-cnpj').val(data.cnpj);
                $('#clientePessoaJuridica-campo-email').val(data.email);
                $('#clientePessoaJuridica-campo-filial').val(data.filial);
                $('#clientePessoaJuridica-campo-telefone').val(data.telefone);
                $('#clientePessoaJuridica-campo-cep').val(data.cep);
                $('#clientePessoaJuridica-campo-logradouro').val(data.logradouro);
                $('#clientePessoaJuridica-campo-numero').val(data.numero);
                $('#clientePessoaJuridica-campo-bairro').val(data.bairro);
                $('#clientePessoaJuridica-campo-uf').val(data.uf);
                $('#clientePessoaJuridica-campo-cidade').val(data.cidade);
                $('#modal-clientePessoaJuridica').modal('show');
            },
            error: function (err) {
                alert("Não foi possivel editar")
            }
        });
    });
});