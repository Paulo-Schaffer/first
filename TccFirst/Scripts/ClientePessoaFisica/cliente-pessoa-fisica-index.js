$(function () {
    $('#clientePessoaFisica-campo-cpf').mask('000.000.000-00', { reverse: true });
    $('#clientePessoaFisica-campo-telefone').mask('(00) 0000-0000');
    $('#clientePessoaFisica-campo-cep').mask('00000-000');

});
$(function () {

    // Ao pressionar o botão enter focar no próximo campo
    $('#clientePessoaFisica-campo-nome').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) {
            $('#clientePessoaFisica-campo-cpf').focus();
        } else if (e.keyCode == 40) {
            $('#clientePessoaFisica-campo-dataNascimento').focus();
        }
    });
    $('#clientePessoaFisica-campo-cpf').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) {
            $('#clientePessoaFisica-campo-dataNascimento').focus();
        } else if (e.keyCode == 37) {
            $('#clientePessoaFisica-campo-nome').focus();
        } else if (e.keyCode == 40) {
            $('#clientePessoaFisica-campo-limiteCredito').focus();
        }
    });
    $('#clientePessoaFisica-campo-dataNascimento').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) {
            $('#clientePessoaFisica-campo-limiteCredito').focus();
        } else if (e.keyCode == 40) {
            $('#clientePessoaFisica-campo-email').focus();
        } else if (e.keyCode == 38) {
            $('#clientePessoaFisica-campo-nome').focus();
        } else if (e.keyCode == 37) {
            $('#clientePessoaFisica-campo-cpf').focus();
        }
    });
    $('#clientePessoaFisica-campo-limiteCredito').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39 || e.keyCode == 40) {
            $('#clientePessoaFisica-campo-email').focus();
        } else if (e.keyCode == 38) {
            $('#clientePessoaFisica-campo-cpf').focus();
        } else if (e.keyCode == 37) {
            $('#clientePessoaFisica-campo-dataNascimento').focus();
        }
    });
    $('#clientePessoaFisica-campo-email').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39 || e.keyCode == 40) {
            $('#clientePessoaFisica-campo-telefone').focus();
        } else if (e.keyCode == 37) {
            $('#clientePessoaFisica-campo-limiteCredito').focus();
        } else if (e.keyCode == 38) {
            $('#clientePessoaFisica-campo-dataNascimento').focus();
        }
    });
    $('#clientePessoaFisica-campo-telefone').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) {
            $('#clientePessoaFisica-campo-cep').focus();
        } else if (e.keyCode == 38 || e.keyCode == 37) {
            $('#clientePessoaFisica-campo-email').focus();
        } else if (e.keyCode == 40) {
            $('#clientePessoaFisica-campo-bairro').focus();
        }
    });
    $('#clientePessoaFisica-campo-cep').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) {
            $('#clientePessoaFisica-campo-numero').focus();
        } else if (e.keyCode == 38) {
            $('#clientePessoaFisica-campo-email').focus();
        } else if (e.keyCode == 40) {
            $('#clientePessoaFisica-campo-cidade').focus();
        } else if (e.keyCode == 37) {
            $('#clientePessoaFisica-campo-telefone').focus();
        }
    });
    $('#clientePessoaFisica-campo-numero').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) {
            $('#clientePessoaFisica-campo-bairro').focus();
        } else if (e.keyCode == 38) {
            $('#clientePessoaFisica-campo-email').focus();
        } else if (e.keyCode == 37) {
            $('#clientePessoaFisica-campo-cep').focus();
        } else if (e.keyCode == 40) {
            $('#clientePessoaFisica-campo-uf').focus();
        }
    });
    $('#clientePessoaFisica-campo-bairro').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) {
            $('#clientePessoaFisica-campo-cidade').focus();
        } else if (e.keyCode == 38) {
            $('#clientePessoaFisica-campo-telefone').focus();
        } else if (e.keyCode == 37) {
            $('#clientePessoaFisica-campo-numero').focus();
        } else if (e.keyCode == 40) {
            $('#clientePessoaFisica-campo-complemento').focus();
        }
    });
    $('#clientePessoaFisica-campo-cidade').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) {
            $('#clientePessoaFisica-campo-uf').focus();
        } else if (e.keyCode == 38) {
            $('#clientePessoaFisica-campo-cep').focus();
        } else if (e.keyCode == 37) {
            $('#clientePessoaFisica-campo-bairro').focus();
        } else if (e.keyCode == 40) {
            $('#clientePessoaFisica-campo-complemento').focus();
        }
    });
    $('#clientePessoaFisica-campo-uf').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) {
            $('#clientePessoaFisica-campo-complemento').focus();
        } else if (e.keyCode == 37) {
            $('#clientePessoaFisica-campo-cidade').focus();
        }
    });
    $('#clientePessoaFisica-campo-complemento').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39 || e.keyCode == 40) {
            $('#clientePessoaFisica-batao-salvar').focus();
        } else if (e.keyCode == 38) {
            $('#clientePessoaFisica-campo-bairro').focus();
        } else if (e.keyCode == 37) {
            $('#clientePessoaFisica-campo-uf').focus();
        }
    });
    $('#clientePessoaFisica-batao-salvar').keyup(function (e) {
        if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaFisica-campo-complemento').focus();
        }
    });

});
$(document).ready(function () {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#ruaclientePessoaFisica-campo-rua").val("");
        $("#clientePessoaFisica-campo-bairro").val("");
        $("#clientePessoaFisica-campo-cidade").val("");
        $("#clientePessoaFisica-campo-uf").val("");

    }

    //Quando o campo cep perde o foco.
    $("#clientePessoaFisica-campo-cep").blur(function () {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#clientePessoaFisica-campo-rua").val("...");
                $("#clientePessoaFisica-campo-bairro").val("...");
                $("#clientePessoaFisica-campo-cidade").val("...");
                $("#clientePessoaFisica-campo-uf").val("...");


                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.

                        $("#clientePessoaFisica-campo-rua").val(dados.logradouro);
                        $("#clientePessoaFisica-campo-bairro").val(dados.bairro);
                        $("#clientePessoaFisica-campo-cidade").val(dados.localidade);
                        $("#clientePessoaFisica-campo-uf").val(dados.uf);

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
    $idAlterar = -1;
    $tabelaClientePessoaFisica = $("#cliente-pessoa-fisica-tabela").DataTable({
        "scrollX": true,
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
                    return '<button class="btn btn-primary botao-editar"data-id="' + row.Id + '" id="botao-editar"><i class="fa fa-edit"></i>Editar</button>\<button class="btn btn-danger botao-apagar"data-id="' + row.Id + '" id="botao-apagar"><i class="fa fa-trash"></i>Apagar</button>'

                }
            }
        ]
    });
    $('#clientePessoaFisica-batao-salvar').on('click', function () {
        $nome = $('#clientePessoaFisica-campo-nome').val();
        $cpf = $('#clientePessoaFisica-campo-cpf').val();
        $dataNascimento = $('#clientePessoaFisica-campo-dataNascimento').val();
        $limiteCredito = $('#clientePessoaFisica-campo-limiteCredito ').val();
        $email = $('#clientePessoaFisica-campo-email').val();
        $telefone = $('#clientePessoaFisica-campo-telefone').val();
        $cep = $('#clientePessoaFisica-campo-cep').val();
        $rua = $('#clientePessoaFisica-campo-rua').val();
        $numero = $('#clientePessoaFisica-campo-numero').val();
        $bairro = $('#clientePessoaFisica-campo-bairro').val();
        $cidade = $('#clientePessoaFisica-campo-cidade').val();
        $uf = $('#clientePessoaFisica-campo-uf').val();
        $complemento = $('#clientePessoaFisica-campo-complemento').val();
        function monstrarMensagem(texto, titulo, tipo) {
            // Tipo -> error ,info, primary, success, default
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
        }
        //Validação
        if ($nome == "") {
            monstrarMensagem('Digite o Nome', '', 'error');
            $('#clientePessoaFisica-campo-nome').focus();
            return false;
        } else if ($cpf == "") {
            monstrarMensagem('Digite o Cpf', '', 'error');
            $('#clientePessoaFisica-campo-cpf').focus();
            return false;
        } else if ($dataNascimento == "") {
            monstrarMensagem('Digite a Data de Nascimento', '', 'error');
            $('#clientePessoaFisica-campo-dataNascimento').focus();
            return false;
        } else if ($limiteCredito == "") {
            monstrarMensagem('Digite o Limite de Crédito', '', 'error');
            $('#clientePessoaFisica-campo-limiteCredito').focus();
            return false;
        } else if ($email == "") {
            monstrarMensagem('Digite o E-mail', '', 'error');
            $('#clientePessoaFisica-campo-email').focus();
            return false;
        } else if ($telefone == "") {
            monstrarMensagem('Digite o Telefone', '', 'error');
            $('#clientePessoaFisica-campo-telefone').focus();
            return false;
        } else if ($cep == "") {
            monstrarMensagem('Digite o Cep', '', 'error');
            $('#clientePessoaFisica-campo-cep').focus();
            return false;
        } else if ($rua == "") {
            monstrarMensagem('Digite a Rua', '', 'error');
            $('#clientePessoaFisica-campo-rua').focus();
            return false;
        } else if ($numero == "") {
            monstrarMensagem('Digite a Número', '', 'error');
            $('#clientePessoaFisica-campo-numero').focus();
            return false;
        } else if ($bairro == "") {
            monstrarMensagem('Digite a Bairro', '', 'error');
            $('#clientePessoaFisica-campo-bairro').focus();
            return false;
        } else if ($cidade == "") {
            monstrarMensagem('Digite a Cidade', '', 'error');
            $('#clientePessoaFisica-campo-cidade').focus();
            return false;
        } else if ($uf == undefined) {
            monstrarMensagem('Selecione a Uf', '', 'error');
            $('#clientePessoaFisica-campo-uf').focus();
            return false;
        } else if ($complemento == "") {
            monstrarMensagem('Digite um Complemento', '', 'error');
            $('#clientePessoaFisica-campo-complemento').focus();
            return false;
        } else {
            monstrarMensagem('Registro Salvo com Sucesso', '', 'success');
        }

        if ($idAlterar == -1) {
            inserir($nome, $cpf, $dataNascimento, $limiteCredito, $email, $telefone, $cep, $rua, $numero, $bairro, $cidade, $uf, $complemento);

        } else {
            alterar($nome, $cpf, $dataNascimento, $limiteCredito, $email, $telefone, $cep, $rua, $numero, $bairro, $cidade, $uf, $complemento);
        }
    });

    function alterar($nome, $cpf, $dataNascimento, $limiteCredito, $email, $telefone, $cep, $rua, $numero, $bairro, $cidade, $uf, $complemento) {
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
                rua: $rua,
                numero: $numero,
                bairro: $bairro,
                cidade: $cidade,
                uf: $uf,
                complemento: $complemento
            },
            success: function (data) {
                //$("#modal-clientePessoaFisicaEditar").modal("hide");
                $('#modal-clientePessoaFisica').modal('hide');
                LimparCampos();
                $idAlterar = -1;
                $tabelaClientePessoaFisica.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    }
    function LimparCampos() {
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
        $idAlterar = -1;
    }
    $('#modal-clientePessoaFisica').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })

    function inserir($nome, $cpf, $dataNascimento, $limiteCredito, $email, $telefone, $cep, $rua, $numero, $bairro, $cidade, $uf, $complemento) {
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
                Rua: $rua,
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
        $.confirm({
            title: 'Deseja Realmente Apagar?',
            content: 'Clique no botão apagar para apagar o registro',
            buttons: {
                Apagar: {
                    btnClass: 'btn-red any-other-class',
                    action: function () {
                        $.ajax({
                            url: '/clientePessoaFisica/apagar?id=' + $idApagar,
                            method: 'get',
                            success: function (data) {
                                $tabelaClientePessoaFisica.ajax.reload();
                            },

                            error: function (err) {
                                alert('Não foi possível apagar');
                            },

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