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
                    return '<button class="btn btn-primary botao-editar"data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar ml-2" data-id="' + row.Id + '">Apagar</button>'

                }

            }

        ]
    });
    function monstrarMensagem(texto, titulo, tipo) {
        // Tipo -> error ,info, primary, success, default
        new PNotify({
            title: titulo,
            text: texto,
            icon: 'icofont icofont-info-circle',
            type: tipo
        });
    }

    $('#fornecedor-batao-salvar').on('click', function () {

        $razaoSocial = $('#fornecedor-nome-razaoSocial').val();
        $nomeFantasia = $('#fornecedor-campo-nomeFantasia').val();
        $dataCadastro = $('#fornecedor-campo-dataCadastro').val();
        $cnpj = $('#fornecedor-campo-cnpj').val();
        $email = $('#fornecedor-campo-email').val();
        $telefone = $('#fornecedor-campo-telefone').val();
        $cep = $('#fornecedor-campo-cep').val();
        $logradouro = $('#fornecedor-campo-logradouro').val();
        $numero = $('#fornecedor-campo-numero').val();
        $bairro = $('#fornecedor-campo-bairro').val();
        $cidade = $('#fornecedor-campo-cidade').val();
        $uf = $('#fornecedor-campo-sigla').val();
        $complemento = $('#fornecedor-campo-complemento').val();

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
        }

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
                $idAlterar = -1;
                $tabelafornecedor.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possível alterar");
            }
        })
    }

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