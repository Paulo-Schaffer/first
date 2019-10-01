﻿
$(function () {
    $('#fornecedor-campo-cnpj').mask('00.000.000.0000/00', { reverse: true });
    $('#fornecedor-campo-telefone').mask('(00) 0000-0000');
    $('#fornecedor-campo-cep').mask('00000-000');


    $(document).ready(function () {

        function limpa_formulário_cep() {

            $("#fornecedor-campo-logradouro").val("");
            $("#fornecedor-campo-bairro").val("");
            $("#fornecedor-campo-cidade").val("");
            $("#fornecedor-campo-sigla").val("");

        }

        //Quando o campo cep perde o foco.
        $("#fornecedor-campo-cep").blur(function () {

            //Nova variável "cep" somente com dígitos.
            var cep = $(this).val().replace(/\D/g, '');

            //Verifica se campo cep possui valor informado.
            if (cep != "") {

                //Expressão regular para validar o CEP.
                var validacep = /^[0-9]{8}$/;

                //Valida o formato do CEP.
                if (validacep.test(cep)) {

                    //Preenche os campos com "..." enquanto consulta webservice.
                    $("#fornecedor-campo-logradouro").val("...");
                    $("#fornecedor-campo-bairro").val("...");
                    $("#fornecedor-campo-cidade").val("...");
                    $("#fornecedor-campo-sigla").val("...");


                    //Consulta o webservice viacep.com.br/
                    $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                        if (!("erro" in dados)) {
                            //Atualiza os campos com os valores da consulta.

                            $("#fornecedor-campo-logradouro").val(dados.logradouro);
                            $("#fornecedor-campo-bairro").val(dados.bairro);
                            $("#fornecedor-campo-cidade").val(dados.localidade);
                            $("#fornecedor-campo-sigla").val(dados.uf);

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
        $('#fornecedor-nome-razaoSocial').keyup(function (e) {
            if (e.keyCode == 13) {
                $('#fornecedor-campo-nomeFantasia').focus();
            }
        });
        $('#fornecedor-campo-nomeFantasia').keyup(function (e) {
            if (e.keyCode == 13) {
                $('#fornecedor-campo-cnpj').focus();
            }
        });
        $('#fornecedor-campo-dataCadastro').keyup(function (e) {
            if (e.keyCode == 13) {
                $('#fornecedor-campo-email').focus();
            }
        });
        $('#fornecedor-campo-cnpj').keyup(function (e) {
            if (e.keyCode == 13) {
                $('#fornecedor-campo-dataCadastro').focus();
            }
        });
        $('#fornecedor-campo-email').keyup(function (e) {
            if (e.keyCode == 13) {
                $('#fornecedor-campo-telefone').focus();
            }
        });
        $('#fornecedor-campo-telefone').keyup(function (e) {
            if (e.keyCode == 13) {
                $('#fornecedor-campo-cep').focus();
            }
        });
        $('#fornecedor-campo-cep').keyup(function (e) {
            if (e.keyCode == 13) {
                $('#fornecedor-batao-salvar').focus();
            }
        });
    });

    $('#fornecedor-campo-cep').mask('00000-000')
    $idAlterar = -1;
    $tabelafornecedor = $("#fornecedor-tabela").DataTable({
        ajax: '/fornecedor/obtertodos',
        serverSide: true,
        columns: [
            { 'data': 'Id' },
            { 'data': 'RazaoSocial' },
            { 'data': 'Email' },
            { 'data': 'Telefone' },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" id="botao-editar" data-id="' + row.Id + '"><i class="fa fa-edit"></i>Editar</button>\<button class="btn btn-danger botao-apagar" id="botao-apagar" data-id="' + row.Id + '"><i class="fa fa-trash"></i>Apagar</button>'

                }

            }

        ]
    });


    $('#fornecedor-batao-salvar').on('click', function () {
        function monstrarMensagem(texto, titulo, tipo) {
            // Tipo -> error ,info, primary, success, default
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
        }
        $razaoSocial =  $('#fornecedor-nome-razaoSocial  ').val();
        $nomeFantasia = $('#fornecedor-campo-nomeFantasia').val();
        $dataCadastro = $('#fornecedor-campo-dataCadastro').val();
        $cnpj =         $('#fornecedor-campo-cnpj        ').val();
        $email =        $('#fornecedor-campo-email       ').val();
        $telefone =     $('#fornecedor-campo-telefone    ').val();
        $cep =          $('#fornecedor-campo-cep         ').val();
        $logradouro =   $('#fornecedor-campo-logradouro  ').val();
        $numero =       $('#fornecedor-campo-numero      ').val();
        $bairro =       $('#fornecedor-campo-bairro      ').val();
        $cidade =       $('#fornecedor-campo-cidade      ').val();
        $uf =           $('#fornecedor-campo-sigla       ').val();
        $complemento =  $('#fornecedor-campo-complemento ').val();

        if ($razaoSocial == '') {
            monstrarMensagem('Digite a Razão Social', '', 'error');
            return false;
        } else if ($nomeFantasia == '') {
            monstrarMensagem('Digite o Nome Fantasia da Empresa', '', 'error');
            return false;
        } else if ($dataCadastro == '') {
            monstrarMensagem('Digite a Data de Lançamento', '', 'error');
            return false;
        } else if ($cnpj == '') {
            monstrarMensagem('Digite o CNPJ da Empresa', '', 'error');
            return false;
        } else if ($email == '') {
            monstrarMensagem('Digite o E-mail', '', 'error');
            return false;
        } else if ($telefone == '') {
            monstrarMensagem('Digite o Telefone', '', 'error');
            return false;
        } else if ($cep == '') {
            monstrarMensagem('Digite o CEP', '', 'error');
            return false;
        }else if ($complemento == '') {
            monstrarMensagem('Digite o Complemento', '', 'error');
            return false;
        } else {
            monstrarMensagem('Registro Salvo com Sucesso', '', 'success');
        };

        if ($idAlterar == -1) {
            inserir($razaoSocial, $nomeFantasia, $dataCadastro, $cnpj, $email, $telefone, $cep, $logradouro, $numero, $bairro, $cidade, $uf, $complemento)
        } else {
            alterar($razaoSocial, $nomeFantasia, $dataCadastro, $cnpj, $email, $telefone, $cep, $logradouro, $numero, $bairro, $cidade, $uf, $complemento)
        }
    });

    function alterar($razaoSocial, $nomeFantasia, $dataCadastro, $cnpj, $email, $telefone, $cep, $logradouro, $numero, $bairro, $cidade, $uf, $complemento) {
        $.ajax({
            url: "/Fornecedor/update",
            method: "post",
            data: {
                id: $idAlterar,
                RazaoSocial: $razaoSocial,
                NomeFantasia: $nomeFantasia,
                Cnpj: $cnpj,
                DataCadastro: $dataCadastro,
                Email: $email,
                Telefone: $telefone,
                Cep: $cep,
                Logradouro: $logradouro,
                Numero: $numero,
                Bairro: $bairro,
                Cidade: $cidade,
                Uf: $uf,
                Complemento: $complemento


            },
            success: function (data) {
                $("#modal-fornecedor").modal("hide");
                $(".modal-backdrop").hide();
                LimparCampos();
                $idAlterar = -1;
                $tabelafornecedor.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    }
    function LimparCampos() {
        $('#fornecedor-nome-razaoSocial').val("");
        $('#fornecedor-campo-nomeFantasia').val("");
        $('#fornecedor-campo-dataCadastro').val("");
        $('#fornecedor-campo-cnpj').val("");
        $('#fornecedor-campo-email').val("");
        $('#fornecedor-campo-telefone').val("");
        $('#fornecedor-campo-cep').val("");
        $('#fornecedor-campo-logradouro').val("");
        $('#fornecedor-campo-numero').val("");
        $('#fornecedor-campo-bairro').val("");
        $('#fornecedor-campo-cidade').val("");
        $('#fornecedor-campo-sigla').val("");
        $('#fornecedor-campo-complemento').val("");
        $idAlterar = -1;
    }
    $("#modal-fornecedor").on('hidden.bs.modal', function (e) {
        LimparCampos();
    })

    function inserir($razaoSocial, $nomeFantasia, $dataCadastro, $cnpj, $email, $telefone, $cep, $logradouro, $numero, $bairro, $cidade, $uf, $complemento) {
        $.ajax({
            url: '/fornecedor/inserir',
            method: 'post',
            data: {
                RazaoSocial: $razaoSocial,
                NomeFantasia: $nomeFantasia,
                DataCadastro: $dataCadastro,
                Cnpj: $cnpj,
                Email: $email,
                Telefone: $telefone,
                Cep: $cep,
                Logradouro: $logradouro,
                Numero: $numero,
                Bairro: $bairro,
                Cidade: $cidade,
                Uf: $uf,
                Complemento: $complemento
            },
            success: function (data) {
                $('#modal-fornecedor').modal('hide');
                $(".modal-backdrop").hide();
                $tabelafornecedor.ajax.reload();
            },
            error: function (err) {
                alert("não vai dar não");

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
                            url: '/fornecedor/apagar?id=' + $idApagar,
                            method: 'get',
                            success: function (data) {
                                $tabelafornecedor.ajax.reload();
                            },

                            error: function (err) {
                                alert('Não foi possível apagar');
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
            url: '/fornecedor/obterpeloid?id=' + $idAlterar,
            method: 'get',

            success: function (data) {
                $('#fornecedor-nome-razaoSocial').val(data.RazaoSocial);
                $('#fornecedor-campo-nomeFantasia').val(data.NomeFantasia);
                $('#fornecedor-campo-cnpj').val(data.Cnpj);
                var dataCadastro = moment(data.DataCadastro);
                console.log;
                $('#fornecedor-campo-dataCadastro').val(dataCadastro.format('YYYY-MM-DD'));
                $('#fornecedor-campo-email').val(data.Email);
                $('#fornecedor-campo-telefone').val(data.Telefone);
                $('#fornecedor-campo-cep').val(data.Cep);
                $('#fornecedor-campo-logradouro').val(data.Logradouro);
                $('#fornecedor-campo-numero').val(data.Numero);
                $('#fornecedor-campo-bairro').val(data.Bairro);
                $('#fornecedor-campo-cidade').val(data.Cidade);
                $('#fornecedor-campo-sigla').val(data.Uf);
                $('#fornecedor-campo-complemento').val(data.Complemento);
                $('#modal-fornecedor').modal('show');
            },
            error: function (err) {
                alert('não foi possível carregar');
            }
        });
    });
    
});
$(function () {

    // Ao pressionar o botão enter focar no próximo campo
    $('#fornecedor-nome-razaoSocial').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40) { // Enter ou seta p/ baixo
            $('#fornecedor-campo-nomeFantasia').focus();
        } else if (e.keyCode == 39) {
            $('#fornecedor-campo-nomeFantasia').focus();
        }
    });
    $('#fornecedor-campo-nomeFantasia').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40) { // Enter ou seta p/ baixo
            $('#fornecedor-campo-cnpj').focus();
        } else if (e.keyCode == 39) {
            $('#fornecedor-campo-cnpj').focus();
        } else if (e.keyCode == 37) { // seta p/ esquerda
            $('#fornecedor-nome-razaoSocial').focus();
        } else if (e.keyCode == 38) { // seta p/ cima foca campo de cima
            $('#fornecedor-nome-razaoSocial').focus();
        }
    });
    $('#fornecedor-campo-cnpj').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) { // Enter ou seta p/ direita
            $('#fornecedor-campo-dataCadastro').focus();
        } else if (e.keyCode == 38 || e.keyCode == 37) { // seta p/ cima foca campo de cima
            $('#fornecedor-campo-nomeFantasia').focus();
        } else if (e.keyCode == 40) { // seta p/ cima foca campo de baixo
            $('#fornecedor-campo-email').focus();
        }
    });
    $('#fornecedor-campo-dataCadastro').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) { // Enter ou seta p/ direita
            $('#fornecedor-campo-email').focus();
        } else if (e.keyCode == 37) { // Enter ou seta p/ esquerda
            $('#fornecedor-campo-cnpj').focus();
        }
        else if (e.keyCode == 38) { // seta p/ cima foca campo de cima
            $('#fornecedor-campo-nomeFantasia').focus();
        } else if (e.keyCode == 40) { // seta p/ cima foca campo de baixo
            $('#fornecedor-campo-telefone').focus();
        }
    });

    $('#fornecedor-campo-email').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) { // Enter ou seta p/ direita
            $('#fornecedor-campo-telefone').focus();
        } else if (e.keyCode == 37) { // seta p/ cima foca campo de cima
            $('#fornecedor-campo-dataCadastro').focus();
        } else if (e.keyCode == 38) { // seta p/ cima foca campo de cima
            $('#fornecedor-campo-cnpj').focus();
        } else if (e.keyCode == 40) { // seta p/ cima foca campo de baixo
            $('#fornecedor-campo-logradouro').focus();
        }
    });
    $('#fornecedor-campo-telefone').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) { // Enter ou seta p/ direita
            $('#fornecedor-campo-logradouro').focus();
        } else if (e.keyCode == 37) { // Enter ou seta p/ esquerda
            $('#fornecedor-campo-email').focus();
        } else if (e.keyCode == 38) { // seta p/ cima foca campo de cima
            $('#fornecedor-campo-dataCadastro').focus();
        } else if (e.keyCode == 40) { // seta p/ cima foca campo de baixo
            $('#fornecedor-campo-logradouro').focus();
        }
    });
    $('#fornecedor-campo-logradouro').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) { // Enter ou seta p/ direita
            $('#fornecedor-campo-cep').focus();
        } else if (e.keyCode == 37) { // Enter ou seta p/ esquerda
            $('#fornecedor-campo-telefone').focus();
        } else if (e.keyCode == 38) { // seta p/ cima foca campo de cima
            $('#fornecedor-campo-email').focus();
        } else if (e.keyCode == 40) { // seta p/ cima foca campo de baixo
            $('#fornecedor-campo-cep').focus();
        }
    });
    $('#fornecedor-campo-cep').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) { // Enter ou seta p/ direita
            $('#fornecedor-campo-numero').focus();
        } else if (e.keyCode == 38 || e.keyCode == 37) { // seta p/ cima foca campo de cima
            $('#fornecedor-campo-logradouro').focus();
        } else if (e.keyCode == 40) { // seta p/ cima foca campo de baixo
            $('#fornecedor-campo-bairro').focus();
        }
    });
    $('#fornecedor-campo-numero').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) { // Enter ou seta p/ direita
            $('#fornecedor-campo-bairro').focus();
        } else if (e.keyCode == 37) { // Enter ou seta p/ esquerda
            $('#fornecedor-campo-cep').focus();
        } else if (e.keyCode == 38) { // seta p/ cima foca campo de cima
            $('#fornecedor-campo-logradouro').focus();
        } else if (e.keyCode == 40) { // seta p/ cima foca campo de baixo
            $('#fornecedor-campo-bairro').focus();
        }
    });
    $('#fornecedor-campo-bairro').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) { // Enter ou seta p/ direita
            $('#fornecedor-campo-cidade').focus();
        } else if (e.keyCode == 37) { // Enter ou seta p/ esquerda
            $('#fornecedor-campo-numero').focus();
        } else if (e.keyCode == 38) { // seta p/ cima foca campo de cima
            $('#fornecedor-campo-cep').focus();
        } else if (e.keyCode == 40) { // seta p/ cima foca campo de baixo
            $('#fornecedor-campo-cidade').focus();
        }
    });
    $('#fornecedor-campo-cidade').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) { // Enter ou seta p/ direita
            $('#fornecedor-campo-sigla').focus();
        } else if (e.keyCode == 37) { // Enter ou seta p/ esquerda
            $('#fornecedor-campo-bairro').focus();
        } else if (e.keyCode == 38) { // seta p/ cima foca campo de cima
            $('#fornecedor-campo-bairro').focus();
        } else if (e.keyCode == 40) { // seta p/ cima foca campo de baixo
            $('#fornecedor-campo-sigla').focus();
        }
    });
    $('#fornecedor-campo-sigla').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) { // Enter ou seta p/ direita
            $('#fornecedor-campo-complemento').focus();
        }
        else if (e.keyCode == 38) { // seta p/ cima foca campo de cima
            $('#fornecedor-campo-cidade').focus();
        } else if (e.keyCode == 40) { // seta p/ cima foca campo de baixo
            $('#fornecedor-batao-salvar').focus();
        }
    });
    $('#fornecedor-campo-complemento').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 39) { // Enter ou seta p/ direita
            $('#fornecedor-batao-salvar').focus();
        }
        else if (e.keyCode == 38) { // seta p/ cima foca campo de cima
            $('#fornecedor-campo-cidade').focus();
        } else if (e.keyCode == 40) { // seta p/ cima foca campo de baixo
            $('#fornecedor-batao-salvar').focus();
        }
    });
    $('#fornecedor-batao-salvar').keyup(function (e) {
        if (e.keyCode == 38) { // seta p/ cima foca campo de cima
            $('#fornecedor-campo-complemento').focus();
        } else { };
    });
});