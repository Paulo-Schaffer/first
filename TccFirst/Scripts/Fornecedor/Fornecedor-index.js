$(function () {
    $idAlterar = -1;
    //alert()
    $tabelafornecedor = $("#fornecedor-tabela").DataTable({
        ajax: '/fornecedor/obtertodos',
        severSide: true,
        columns: [
            { 'data': 'id' },
            { 'data': 'RazaoSocial' },
            { 'data': 'NomeFantasia' },
            { 'data': 'DataCadastro' },
            { 'data': 'Cnpj' },
            { 'data': 'Email' },
            { 'data': 'Telefone' },
            { 'data': 'Cep' },
            { 'data': 'Logradouro' },
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
    $('#fornecedor-batao-salvar').on('click', function () {
        $razaoSocial = $('#fornecedor-razaoSocial-campo').val();
        $nomeFantasia = $('#fornecedor-campo-nomeFantasia').val();
        $dataCadastro = $('#fornecedor-campo-dataCadastro').val();
        $cnpj = $('#fornecedor-campo-cnpj').val();
        $email = $('#fornecedor-campo-email').val();
        $telefone = $('#fornecedor-campo-telefone').val();
        $cep = $('#fornecedor-campo-cep').val();
        $logradouro = $('fornecedor-campo-logradouro').val();
        $numero = $('#fornecedor-campo-numero').val();
        $bairro = $('#fornecedor-campo-bairro').val();
        $cidade = $('#fornecedor-campo-cidade').val();
        $uf = $('#fornecedor-campo-sigla').val();
        $complemento = $('#fornecedor-campo-complemento').val();

        if ($idAlterar == -1) {
            inserir($razaoSocial, $nomeFantasia, $dataCadastro, $cnpj, $email, $telefone, $cep, $numero, $bairro, $cidade, $uf, $complemento);
        } else {
            alterar($razaoSocial, $nomeFantasia, $dataCadastro, $cnpj, $email, $telefone, $cep, $numero, $bairro, $cidade, $uf, $complemento);
        }
    });

    function alterar($razaoSocial, $nomeFantasia, $cnpj, $dataCadastro, $email, $telefone, $cep, $numero, $bairro, $cidade, $uf, $complemento) {
        $.ajax({
            url: "/fornecedor/update",
            method: "post",
            data: {
                id: $idAlterar,
                razaoSocial: $razaoSocial,
                nomeFantasia: $nomeFantasia,
                cnpj: $cnpj,
                dataCadastro: $dataCadastro,
                email: $email,
                telefone: $telefone,
                cep: $cep,
                numero: $numero,
                bairro: $bairro,
                cidade: $cidade,
                uf: $uf,
                complemento: $complemento


            },
            success: function (data) {
                $("#modal-fornecedor").modal("hide");
                $idAlterar = -1;
                $tabela.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    }

    function inserir($razaoSocial, $nomeFantasia, $cnpj, $dataCadastro, $email, $telefone, $cep, $numero, $bairro, $cidade, $uf, $complemento) {
        $.ajax({
            url: '/fornecedor/inserir',
            method: 'post',
            data: {
                razaoSocial: $razaoSocial,
                nomeFantasia: $nomeFantasia,
                cnpj: $cnpj,
                ddataCadastro: $dataCadastro,
                email: $email,
                telefone: $telefone,
                cep: $cep,
                numero: $numero,
                bairro: $bairro,
                cidade: $cidade,
                uf: $uf,
                complemento: $complemento
            },
            success: function (data) {
                $('#modal-fornecedor').modal('hide');
                tabelafornecedor.ajax.reload();
            },
            error: function (err) {

            }
        });
    }

    $('.table').on('click', '.botao-apagar', function () {
        $idApagar = $(this).data('id');

        $.ajax({
            url: '/fornecedor/apagar?id=' + $idApagar,
            method: 'get',
            success: function (data) {
                tabelafornecedor.ajax.reload();
            },

            error: function (err) {
                alert('Não foi possível apagar');
            }

        });
    });

    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');

        $.ajax({
            url: '/fornecedor/obterpeloid?id=' + $idAlterar,
            method: 'get',

            success: function (data) {
                $('#fornecedor-campo-razaoSocial').val(data.razaoSocial);
                $('#fornecedor-campo-nomeFantasia').val(data.nomeFantasia);
                $('#fornecedor-campo-cnpj').val(data.cnpj);
                $('#fornecedor-campo-dataCadastro').val(data.dataCadastro);
                $('#fornecedor-campo-email').val(data.Email);
                $('#fornecedor-campo-telefone').val(data.Telefone);
                $('#fornecedor-campo-cep').val(data.Cep);
                $('#fornecedor-campo-numero').val(data.Numero);
                $('#fornecedor-campo-bairro').val(data.Bairro);
                $('#fornecedor-campo-cidade').val(data.Cidade);
                $('#fornecedor-campo-uf').val(data.Uf);
                $('#fornecedor-campo-complemento').val(data.Complemento);
                $('#modal-fornecedor').modal('show');
            },
            error: function (err) {
                alert('não foi possível carregar');
            }
        });
    });
});