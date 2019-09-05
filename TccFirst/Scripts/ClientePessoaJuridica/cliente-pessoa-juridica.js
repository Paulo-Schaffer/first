$(function () {
    $idAlterar = -1;
    
    $tabelaClientePessoaJuridica = $("#cliente-pessoa-juridica-tabela").DataTable({
        "scrollX": true,
        ajax: '/ClientePessoaJuridica/obtertodos',
        severSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'RazaoSocial' },            
            { 'data': 'NomeFantasia' }, 
            { 'data': 'Cnpj' },
            { 'data': 'Uf' },
            { 'data': 'Cidade' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'
                }
            }
        ]
    });
    $('#clientePessoaJuridica-botao-salvar').on('click', function () {
        $razaoSocial= $('#clientePessoaJuridica-campo-razaoSocial').val();
        $atividade= $('#clientePessoaJuridica-campo-atividade').val();
        $nomeFantasia= $('#clientePessoaJuridica-campo-nomeFantasia').val();
        $dataCadastro= $('#clientePessoaJuridica-campo-dataCadastro').val();
        $cnpj= $('#clientePessoaJuridica-campo-cnpj').val();
        $email= $('#clientePessoaJuridica-campo-email').val();
        $filial= $('#clientePessoaJuridica-campo-filial').val();
        $telefone= $('#clientePessoaJuridica-campo-telefone').val();
        $cep= $('#clientePessoaJuridica-campo-cep').val();
        $logradouro= $('#clientePessoaJuridica-campo-logradouro').val();
        $numero= $('#clientePessoaJuridica-campo-numero').val();
        $bairro= $('#clientePessoaJuridica-campo-bairro').val();
        $uf= $('#clientePessoaJuridica-campo-uf').val();
        $cidade= $('#clientePessoaJuridica-campo-cidade').val();

        if ($idAlterar == -1) {
            inserir($razaoSocial, $atividade, $nomeFantasia, $dataCadastro, $cnpj, $email, $filial, $telefone, $cep, $logradouro, $numero, $bairro, $uf, $cidade);
        } else {
            alterar($razaoSocial, $atividade, $nomeFantasia, $dataCadastro, $cnpj, $email, $filial, $telefone, $cep, $logradouro, $numero, $bairro, $uf, $cidade);
        }
    });
    function alterar($razaoSocial, $atividade, $nomeFantasia, $dataCadastro, $cnpj, $email, $filial, $telefone, $cep, $logradouro, $numero, $bairro, $uf, $cidade) {

        $.ajax({
            url: "/clientePessoaJuridica/update",
            method: "post",
            data: {
                id: $idAlterar,
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
                $idAlterar = -1;
                $tabelaClientePessoaJuridica.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel alterar");
            }
        });
    }
    function inserir($razaoSocial, $atividade, $nomeFantasia, $dataCadastro, $cnpj, $email, $filial, $telefone, $cep, $logradouro, $numero, $bairro, $uf, $cidade) {
        $.ajax({
            url: "/clientePessoaJuridica/inserir",
            method: 'post',
            data: {
                RazaoSocial: $razaoSocial,
                Atividade: $atividade,
                NomeFantasia: $nomeFantasia,
                DataCadastro: $dataCadastro,
                Cnpj: $cnpj,
                Email: $email,
                Filial: $filial,
                Telefone: $telefone,
                Cep: $cep,
                Logradouro: $logradouro,
                Numero: $numero,
                Bairro: $bairro,
                Uf: $uf,
                Cidade: $cidade
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
            url: "/clientePessoaJuridica/apagar?id=" + $idApagar,
            method: 'get',
            success: function (data) {
                $tabelaClientePessoaJuridica.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possivel apagar');
            }
        });
    });
    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');

        $.ajax({
            url: "/clientePessoaJuridica/obterpeloid?id=" + $idAlterar,
            method: 'get',
            success: function (data) {
                $('#clientePessoaJuridica-campo-razaoSocial').val(data.RazaoSocial);
                $('#clientePessoaJuridica-campo-atividade').val(data.Atividade);
                $('#clientePessoaJuridica-campo-nomeFantasia').val(data.NomeFantasia);
                var dataCadastro = moment(data.DataCadastro);
                console.log();
                $('#clientePessoaJuridica-campo-dataCadastro').val(dataCadastro.format('YYYY-MM-DD'));
                $('#clientePessoaJuridica-campo-cnpj').val(data.Cnpj);
                $('#clientePessoaJuridica-campo-email').val(data.Email);
                $('#clientePessoaJuridica-campo-filial').val(data.Filial);
                $('#clientePessoaJuridica-campo-telefone').val(data.Telefone);
                $('#clientePessoaJuridica-campo-cep').val(data.Cep);
                $('#clientePessoaJuridica-campo-logradouro').val(data.Logradouro);
                $('#clientePessoaJuridica-campo-numero').val(data.Numero);
                $('#clientePessoaJuridica-campo-bairro').val(data.Bairro);
                $('#clientePessoaJuridica-campo-uf').val(data.Uf);
                $('#clientePessoaJuridica-campo-cidade').val(data.Cidade);
                $('#modal-clientePessoaJuridica').modal('show');
                
            },
            error: function (err) {
                alert("Não foi possivel editar")
            }
        });
    });
});