﻿$(function () {

    $('#clientePessoaJuridica-campo-razaoSocial').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-campo-atividade').focus();
        }
    });
    $('#clientePessoaJuridica-campo-atividade').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-campo-nomeFantasia').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-razaoSocial').focus();
        }
    });
    $('#clientePessoaJuridica-campo-nomeFantasia').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-campo-dataCadastro').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-atividade').focus();
        }
    });
    $('#clientePessoaJuridica-campo-dataCadastro').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-campo-cnpj').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-nomeFantasia').focus();
        }
    });
    $('#clientePessoaJuridica-campo-cnpj').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-campo--dataCadastro').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-dataCadastro').focus();
        }
    });
    $('#clientePessoaJuridica-campo-email').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-campo-filial').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-cnpj').focus();
        }
    });
    $('#clientePessoaJuridica-campo-filial').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-campo-telefone').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-email').focus();
        }
    });
    $('#clientePessoaJuridica-campo-telefone').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-campo-cep').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-filial').focus();
        }
    });
    $('#clientePessoaJuridica-campo-cep').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-campo-logradouro').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-telefone').focus();
        }
    });
    $('#clientePessoaJuridica-campo-logradouro').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-campo-numero').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-cep').focus();
        }
    });
    $('#clientePessoaJuridica-campo-numero').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-campo-bairro').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-logradouro').focus();
        }
    });
    $('#clientePessoaJuridica-campo-bairro').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-campo-uf').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-numero').focus();
        }
    });
    $('#clientePessoaJuridica-campo-uf').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-campo-cidade').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-bairro').focus();
        }
    });
    $('#clientePessoaJuridica-campo-cidade').keyup(function (e) {
        if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 39) {
            $('#clientePessoaJuridica-botao-salvar').focus();
        } else if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-uf').focus();
        }
    });
    $('#clientePessoaJuridica-botao-salvar').keyup(function (e) {
        if (e.keyCode == 37 || e.keyCode == 38) {
            $('#clientePessoaJuridica-campo-cidade').focus();
        }
    });
});
$(document).ready(function () {

    $('#clientePessoaJuridica-campo-cnpj').blur(function () {

        var cnpj = $('#clientePessoaJuridica-campo-cnpj').val().replace(/[^0-9]/g, '');

        if (cnpj.length == 14) {
            $.ajax({
                url: 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
                method: 'GET',
                dataType: 'jsonp', 
                complete: function (xhr) {

                    response = xhr.responseJSON;

                    if (response.status == 'OK') {
                        $('#clientePessoaJuridica-campo-nomeFantasia').val(response.fantasia);                       
                        $('#clientePessoaJuridica-campo-email').val(response.email);
                        $('#clientePessoaJuridica-campo-razaoSocial').val(response.nome);
                        $('#clientePessoaJuridica-campo-nomeFantasia').val(response.fantasia);
                        $('#clientePessoaJuridica-campo-logradouro').val(response.logradouro);
                        $('#clientePessoaJuridica-campo-cep').val(response.cep);
                        $('#clientePessoaJuridica-campo-telefone').val(response.telefone);
                        $('#clientePessoaJuridica-campo-numero').val(response.numero);
                        $('#clientePessoaJuridica-campo-bairro').val(response.bairro);
                        $('#clientePessoaJuridica-campo-cidade').val(response.municipio);
                        $('#clientePessoaJuridica-campo-uf').val(response.uf);
                    } else {
                        alert(response.message);
                    }
                }
            });
        } else {
            alert('CNPJ inválido');
        }
    });
})

$(document).ready(function () {

    function limpa_formulário_cep() {
        $("#logradouroclientePessoaJuridica-campo-logradouro").val("");
        $("#clientePessoaJuridica-campo-bairro").val("");
        $("#clientePessoaJuridica-campo-cidade").val("");
        $("#clientePessoaJuridica-campo-uf").val("");
    }

    $("#clientePessoaJuridica-campo-cep").blur(function () {

        var cep = $(this).val().replace(/\D/g, '');
        if (cep != "") {

            var validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {
                $("#clientePessoaJuridica-campo-logradouro").val("...");
                $("#clientePessoaJuridica-campo-bairro").val("...");
                $("#clientePessoaJuridica-campo-cidade").val("...");
                $("#clientePessoaJuridica-campo-uf").val("...");
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        $("#clientePessoaJuridica-campo-logradouro").val(dados.logradouro);
                        $("#clientePessoaJuridica-campo-bairro").val(dados.bairro);
                        $("#clientePessoaJuridica-campo-cidade").val(dados.localidade);
                        $("#clientePessoaJuridica-campo-uf").val(dados.uf);
                    } 
                    else {
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } 
            else {
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } 
        else {
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
                    return '<button class="btn btn-primary botao-editar" id="botao-editar" data-id="' + row.Id + '"><i class="fa fa-edit"></i>Editar</button>\<button class="btn btn-danger botao-apagar" id="botao-apagar" data-id="' + row.Id + '"><i class="fa fa-trash"></i>Apagar</button>'
                }
            }
        ]
    });
    $('#clientePessoaJuridica-botao-salvar').on('click', function () {
        function monstrarMensagem(texto, titulo, tipo) {
            new PNotify({
                title: titulo,
                text: texto,
                icon: 'icofont icofont-info-circle',
                type: tipo
            });
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

        if ($razaoSocial == "") {
            monstrarMensagem('Digite a Razão Social', '', 'error');
            $("#clientePessoaJuridica-campo-razaoSocial").focus();
            return false;
        } else if ($atividade == "") {
            monstrarMensagem('Digite a Atividade', '', 'error');
            $('#clientePessoaJuridica-campo-atividade').focus();
            return false;
        } else if ($nomeFantasia == "") {
            monstrarMensagem('Digite o Nome Fantasia', '', 'error');
            $('#clientePessoaJuridica-campo-nomeFantasia').focus();
            return false;
        } else if ($dataCadastro == "") {
            monstrarMensagem('Digite a Data Cadastro', '', 'error');
            $('#clientePessoaJuridica-campo-dataCadastro').focus();
            return false;
        } else if ($cnpj == "") {
            monstrarMensagem('Digite o Cnpj', '', 'error');
            $('#clientePessoaJuridica-campo-cnpj').focus();
            return false;
        } else if ($email == "") {
            monstrarMensagem('Digite o E-mail', '', 'error');
            $('#clientePessoaJuridica-campo-email').focus();
            return false;
        } else if ($filial == "") {
            monstrarMensagem('Digite a Filial', '', 'error');
            $('#clientePessoaJuridica-campo-filial').focus();
            return false;
        } else if ($telefone == "") {
            monstrarMensagem('Digite o Telefone', '', 'error');
            $('#clientePessoaJuridica-campo-telefone').focus();
            return false;
        } else if ($cep == "") {
            monstrarMensagem('Digite o Cep', '', 'error');
            $('#clientePessoaJuridica-campo-cep').focus();
            return false;
        } else if ($logradouro == "") {
            monstrarMensagem('Digite o Logradouro', '', 'error');
            $('#clientePessoaJuridica-campo-logradouro').focus();
            return false;
        } else if ($numero == "") {
            monstrarMensagem('Digite o Número', '', 'error');
            $('#clientePessoaJuridica-campo-numero').focus();
            return false;
        } else if ($bairro == "") {
            monstrarMensagem('Digite o Bairro', '', 'error');
            $('#clientePessoaJuridica-campo-bairro').focus();
            return false;
        } else if ($uf == "") {
            monstrarMensagem('Digite a UF', '', 'error');
            $('#clientePessoaJuridica-campo-uf').focus();
            return false;
        } else if ($cidade == "") {
            monstrarMensagem('Digite a Cidade', '', 'error');
            $('#clientePessoaJuridica-campo-cidade').focus();
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
});
