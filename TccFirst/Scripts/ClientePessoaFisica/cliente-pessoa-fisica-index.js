$(function () {
    $('#clientePessoaFisica-campo-cpf').mask('000.000.000-00', { reverse: true });
    $('#clientePessoaFisica-campo-telefone').mask('(00) 0000-0000');
    $('#clientePessoaFisica-campo-cep').mask('00000-000');
    

});
$(function () {
    $idAlterar = -1;
    $tabelaClientePessoaFisica = $("#cliente-pessoa-fisica-tabela").DataTable({
        responsive: true,
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
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar"data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'

                }
            }
        ]
    });
    $('#clientePessoaFisica-batao-salvar').on('click', function () {
        if ($('#clientePessoaFisica-campo-nome').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Nome </div>');

        } else if ($('#clientePessoaFisica-campo-cpf').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Cpf </div>');
        }
        else if ($('#clientePessoaFisica-campo-dataNascimento').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Data de Nascimento </div>');
        }
        else if ($('#clientePessoaFisica-campo-limiteCredito').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Limite de Crédito </div>');
        }
        else if ($('#clientePessoaFisica-campo-email').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo de E-mail </div>');
        }
        else if ($('#clientePessoaFisica-campo-telefone').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Telefone </div>');
        }
        else if ($('#clientePessoaFisica-campo-cep').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Cep </div>');
        }
        else if ($('#clientePessoaFisica-campo-numero').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Numero </div>');
        }
        else if ($('#clientePessoaFisica-campo-bairro').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Bairro </div>');
        }
        else if ($('#clientePessoaFisica-campo-cidade').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Cidade </div>');
        }
        else if ($('#clientePessoaFisica-campo-uf').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Uf </div>');
        }
        else if ($('#clientePessoaFisica-campo-complemento').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Complemento </div>');
        }
        else {
            $('#msg').html('<div class="alert alert-success" role="alert">Registro Cadastrado com Sucesso </div>');
        }
        $nome = $('#clientePessoaFisica-campo-nome').val();
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
            inserir($nome, $cpf, $dataNascimento, $limiteCredito, $email, $telefone, $cep, $numero, $bairro, $cidade, $uf, $complemento)
            $('.modal').on('hidden.bs.modal', function (e) {
                $(this).removeData();
            });
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
                bairro: $bairro,
                cidade: $cidade,
                uf: $uf,
                complemento: $complemento
            },
            success: function (data) {
                $("#modal-clientePessoaFisica").modal("hide");
                $idAlterar = -1;
                $tabelaClientePessoaFisica.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    }

    function inserir($nome, $cpf, $dataNascimento, $limiteCredito, $email, $telefone, $cep , $numero, $bairro, $cidade, $uf, $complemento) {
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
                $(".modal-backdrop").hide();
                $('#clientePessoaFisica-campo-nome').val("");
                $('#clientePessoaFisica-campo-cpf').val("");
                $('#clientePessoaFisica-campo-dataNascimento').val("");
                $('#clientePessoaFisica-campo-limiteCredito').val("");
                $('#clientePessoaFisica-campo-email').val("");
                $('#clientePessoaFisica-campo-telefone').val("");
                $('#clientePessoaFisica-campo-cep').val("");
                $('#clientePessoaFisica-campo-numero').val("");
                $('#clientePessoaFisica-campo-bairro').val("");
                $('#clientePessoaFisica-campo-cidade').val("");
                $('#clientePessoaFisica-campo-uf').val("");
                $('#clientePessoaFisica-campo-complemento').val("");

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
                $('#clientePessoaFisica-campo-cpf').val(data.Cpf);
                var dataNascimento = moment(data.DataNascimento);
                console.log();

                $('#clientePessoaFisica-campo-dataNascimento').val(dataNascimento.format('YYYY-MM-DD'));
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