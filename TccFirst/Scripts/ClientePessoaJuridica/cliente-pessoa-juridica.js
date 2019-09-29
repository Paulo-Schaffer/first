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
                    return '<button class="btn btn-primary botao-editar  fa fa-pencil-square-o " data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger fa fa-trash botao-apagar ml-2 " data-id="' + row.Id + '">Apagar</button>'
                }
            }
        ]
    });
    $('#clientePessoaJuridica-botao-salvar').on('click', function () {
        $razaoSocial = $('#clientePessoaJuridica-campo-razaoSocial').val();
        $atividade = $('#clientePessoaJuridica-campo-atividade').val();
        $nomeFantasia = $('#clientePessoaJuridica-campo-nomeFantasia').val();
        $dataCadastro = $('#clientePessoaJuridica-campo-dataCadastro').val();
        $cnpj = $('#clientePessoaJuridica-campo-cnpj').val();
        $email = $('#clientePessoaJuridica-campo-email').val();
        $filial = $('#clientePessoaJuridica-campo-filial').val();
        $telefone = $('#clientePessoaJuridica-campo-telefone').val();
        $cep = $('#clientePessoaJuridica-campo-cep').val();
        $logradouro = $('#clientePessoaJuridica-campo-logradouro').val();
        $numero = $('#clientePessoaJuridica-campo-numero').val();
        $bairro = $('#clientePessoaJuridica-campo-bairro').val();
        $uf = $('#clientePessoaJuridica-campo-uf').val();
        $cidade = $('#clientePessoaJuridica-campo-cidade').val();

        if ($.trim($('#clientePessoaJuridica-campo-razaoSocial').val()) == '') {
            alert('Preencha o campo Razão Social');           
            return false;
            
        } else if ($.trim($('#clientePessoaJuridica-campo-atividade').val()) == "") {
            alert('Preencha o campo Atividade ');           
            return false;

        } else if ($.trim($('#clientePessoaJuridica-campo-nomeFantasia').val()) == "") {
            alert('Preencha o campo Nome Fantasia');          
            return false;

        } else if ($.trim ($('#clientePessoaJuridica-campo-dataCadastro').val()) == "") {
           alert("Preencha o campo Data Cadastro");
            return false;

        } else if ($.trim($('#clientePessoaJuridica-campo-cnpj').val()) == "") {
            alert("Preencha o campo CNPJ");
            return false;

        } else if ($.trim($('#clientePessoaJuridica-campo-email').val()) == "") {
            alert("Preencha o campo E-Mail");
            return false;

        } else if ($.trim($('#clientePessoaJuridica-campo-telefone').val()) == "") {
            alert("Preencha o campo Telefone");
            return false;

        } else if ($.trim($('#clientePessoaJuridica-campo-cep').val()) == "") {
            alert("Preencha o campo CEP");
            return false;

        } else if ($.trim($('#clientePessoaJuridica-campo-numero').val()) == "") {
          alert("Preencha o campo Numero");
            return false;
        } else {
            monstrarMensagem('Registro Salvo com Sucesso', '', 'success');
        };
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
                Limparcampos();
                $idAlterar = -1;
                $tabelaClientePessoaJuridica.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel alterar");
            }
        });
    }
    function Limparcampos() {
        $('#clientePessoaJuridica-campo-razaoSocial').val("");
        $('#clientePessoaJuridica-campo-atividade').val("");
        $('#clientePessoaJuridica-campo-nomeFantasia').val("");
        $('#clientePessoaJuridica-campo-dataCadastro').val("");
        $('#clientePessoaJuridica-campo-cnpj').val("");
        $('#clientePessoaJuridica-campo-email').val("");
        $('#clientePessoaJuridica-campo-filial').val("");
        $('#clientePessoaJuridica-campo-telefone').val("");
        $('#clientePessoaJuridica-campo-cep').val("");
        $('#clientePessoaJuridica-campo-logradouro').val("");
        $('#clientePessoaJuridica-campo-numero').val("");
        $('#clientePessoaJuridica-campo-bairro').val("");
        $('#clientePessoaJuridica-campo-uf').val("");
        $('#clientePessoaJuridica-campo-cidade').val("");
    }
    $('#modal-clientePessoaJuridica').on('hidden.bs.modal', function (e) {
        Limparcampos();
    })
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
                LimparCampos();
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
        $.confirm({
            title: 'Deseja Realmente Apagar?',
            content: 'Clique no botão Apagar para apagar o registro',
            buttons: {
                Apagar: {
                    btnClass: 'btn-red any-other-class',
                    action: function () {
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
                    }
                },
                cancelar: function () {
                },
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
    function LimparCampos() {
        $('#clientePessoaJuridica-campo-razaoSocial').val("");
        $('#clientePessoaJuridica-campo-atividade').val("");
        $('#clientePessoaJuridica-campo-nomeFantasia').val("");
        $('#clientePessoaJuridica-campo-dataCadastro').val("");
        $('#clientePessoaJuridica-campo-cnpj').val("");
        $('#clientePessoaJuridica-campo-email').val("");
        $('#clientePessoaJuridica-campo-filial').val("");
        $('#clientePessoaJuridica-campo-telefone').val("");
        $('#clientePessoaJuridica-campo-cep').val("");
        $('#clientePessoaJuridica-campo-logradouro').val("");
        $('#clientePessoaJuridica-campo-numero').val("");
        $('#clientePessoaJuridica-campo-bairro').val("");
        $('#clientePessoaJuridica-campo-uf').val("");
        $('#clientePessoaJuridica-campo-cidade').val("");
        $idAlterar = -1;
    }
    $('#modal-clientePessoaJuridica').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })

  
});   
