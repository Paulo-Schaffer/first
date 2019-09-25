$(function () {

    // Ao pressionar o botão enter focar no próximo campo
    $('#clientePessoaJuridica-campo-razaoSocial').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-campo-atividade').focus();
        }
    });
    $('#clientePessoaJuridica-campo-atividade').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-campo-nomeFantasia').focus();
        }
    });
    $('#clientePessoaJuridica-campo-nomeFantasia').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-campo-dataCadastro').focus();
        }
    });
    $('#clientePessoaJuridica-campo-dataCadastro').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-campo-cnpj').focus();
        }
    });
    $('#clientePessoaJuridica-campo-cnpj').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-campo-email').focus();
        }
    });
    $('#clientePessoaJuridica-campo-email').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-campo-filial').focus();
        }
    });
    $('#clientePessoaJuridica-campo-filial').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-campo-telefone').focus();
        }
    });
    $('#clientePessoaJuridica-campo-telefone').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-campo-cep').focus();
        }
    });
    $('#clientePessoaJuridica-campo-cep').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-campo-logradouro').focus();
        }
    });
    $('#clientePessoaJuridica-campo-logradouro').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-campo-numero').focus();
        }
    });
    $('#clientePessoaJuridica-campo-numero').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-campo-bairro').focus();
        }
    });
    $('#clientePessoaJuridica-campo-bairro').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-campo-uf').focus();
        }
    });
    $('#clientePessoaJuridica-campo-uf').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-campo-cidade').focus();
        }
    });
    $('#clientePessoaJuridica-campo-cidade').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#clientePessoaJuridica-batao-salvar').focus();
        }
    });
});
$(document).ready(function () {

    function limpa_formulário_cep() {

        $("#logradouroclientePessoaJuridica-campo-logradouro").val("");
        $("#clientePessoaJuridica-campo-bairro").val("");
        $("#clientePessoaJuridica-campo-cidade").val("");
        $("#clientePessoaJuridica-campo-uf").val("");

    }

    //Quando o campo cep perde o foco.
    $("#clientePessoaJuridica-campo-cep").blur(function () {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#clientePessoaJuridica-campo-logradouro").val("...");
                $("#clientePessoaJuridica-campo-bairro").val("...");
                $("#clientePessoaJuridica-campo-cidade").val("...");
                $("#clientePessoaJuridica-campo-uf").val("...");


                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.

                        $("#clientePessoaJuridica-campo-logradouro").val(dados.logradouro);
                        $("#clientePessoaJuridica-campo-bairro").val(dados.bairro);
                        $("#clientePessoaJuridica-campo-cidade").val(dados.localidade);
                        $("#clientePessoaJuridica-campo-uf").val(dados.uf);

                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});
$(function () {
    $('#clientePessoaJuridica-campo-cnpj').mask('00.000.000/0000-00', { reverse: true });
    $('#clientePessoaJuridica-campo-telefone').mask('(00) 0000-0000');
    $('#clientePessoaJuridica-campo-cep').mask('00000-000');
});

$(function () {
    $idAlterar = -1;    
    $tabelaClientePessoaJuridica = $("#cliente-pessoa-juridica-tabela").DataTable({
        "scrollX": true,
        ajax: '/clientePessoaJuridica/obtertodos',
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
        if ($('#clientePessoaJuridica-campo-razaoSocial').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Razão Social </div>');
            $('#clientePessoaJuridica-campo-razaoSocial').focus();
            return false;

        } else if ($('#clientePessoaJuridica-campo-atividade').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Atividade </div>');
            $('#clientePessoaJuridica-campo-atividade').focus();
            return false;

        } else if ($('#clientePessoaJuridica-campo-nomeFantasia').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Nome Fantasia </div>');
            $('#clientePessoaJuridica-campo-nomeFantasia').focus();
            return false;

        } else if ($('#clientePessoaJuridica-campo-dataCadastro').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Data Cadastro </div>');
            $('#clientePessoaJuridica-campo-dataCadastro').focus();
            return false;

        } else if ($('#clientePessoaJuridica-campo-cnpj').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo CNPJ </div>');
            $('#clientePessoaJuridica-campo-cnpj').focus();
            return false;

        } else if ($('#clientePessoaJuridica-campo-email').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo E-Mail </div>');
            $('#clientePessoaJuridica-campo-email').focus();
            return false;

        } else if ($('#clientePessoaJuridica-campo-telefone').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Telefone </div>');
            $('#clientePessoaJuridica-campo-telefone').focus();
            return false;

        } else if ($('#clientePessoaJuridica-campo-cep').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo CEP </div>');
            $('#clientePessoaJuridica-campo-cep').focus();
            return false;

        } else if ($('#clientePessoaJuridica-campo-numero').val() == "") {
            $('#msg-error').html('<div class="alert alert-danger" role="alert">Preencha o campo Numero </div>');
            $('#clientePessoaJuridica-campo-numero').focus();
            return false;
        }else {
                $('.alert').alert("");
            }

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
                $(".modal-backdrop").hide();               
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