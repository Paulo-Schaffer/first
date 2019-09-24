using Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace Repository
{
    // internal class SistemaInitializer : CreateDatabaseIfNotExists<SistemaContext>
    internal class SistemaInitializer : DropCreateDatabaseAlways<SistemaContext>
    {
        protected override void Seed(SistemaContext context)
        {
            #region agencias
            var agencias = new List<Agencia>();
            agencias.Add(new Agencia()
            {
                NomeAgencia = "Agencia da Vida",
                NumeroAgencia = 2001,
                Banco = "Banco de Vida",
                RegistroAtivo = true
            });
            agencias.Add(new Agencia()
            {
                NomeAgencia = "Agencia do Paulo",
                NumeroAgencia = 666,
                Banco = "Banco do Paulo",
                RegistroAtivo = true
            });

            agencias.Add(new Agencia()
            {
                NomeAgencia = "Você consegue",
                NumeroAgencia = 8001,
                Banco = "Banco do Goku",
                RegistroAtivo = true,
            });
            context.Agencias.AddRange(agencias);

            #endregion

            #region caixa
            var caixa = new List<Caixa>();
            caixa.Add(new Caixa()
            {
                Descricao = "Caixa é caixa",
                Documento = "Este documento é meu",
                FormaPagamento = "Debito",
                Valor = 1900,
                DataLancamento = Convert.ToDateTime("1900-01-01 00:00:00"),
                Status = "Aberto",
                Historico = "Fatura 15,89 dia 19/09/2000",
                RegistroAtivo = true
            });
            caixa.Add(new Caixa()
            {
                Descricao = "Caixa é Bradesco",
                Documento = "Este documento é seu",
                FormaPagamento = "Crédito",
                Valor = 17900,
                DataLancamento = Convert.ToDateTime("1967-02-11 12:17:5"),
                Status = "Pago",
                Historico = "Fatura 1547,89 dia 20/12/2000",
                RegistroAtivo = true
            });
            context.Caixas.AddRange(caixa);
            #endregion

            #region categoriasDespesa
            var categoriaDespesa = new List<CategoriaDespesa>();
            categoriaDespesa.Add(new CategoriaDespesa()
            {
                TipoCategoriaDespesa = "Despesa com Funcionário",
                RegistroAtivo = true,
            });
            categoriaDespesa.Add(new CategoriaDespesa()
            {
                TipoCategoriaDespesa = "Despesa com Lanche",
                RegistroAtivo = true,
        });
            context.CategoriasDespesas.AddRange(categoriaDespesa);
            #endregion

            #region categoriasReceita
            var categoriaReceita = new List<CategoriaReceita>();
            categoriaReceita.Add(new CategoriaReceita()
            {
                Id = 1,
                TipoCategoriaReceita = "Despesa com Funcionário",
                RegistroAtivo = true,
            });
            categoriaReceita.Add(new CategoriaReceita()
            {
                Id = 2,
                TipoCategoriaReceita = "Despesa com Lanche",
                RegistroAtivo = true,
            });
            context.CategoriasReceitas.AddRange(categoriaReceita);
            #endregion

            #region clientesPessoasFisicas

            var clientesPessoaFisica = new List<ClientePessoaFisica>();
            clientesPessoaFisica.Add(new ClientePessoaFisica()
            {
                Id = 1,
                Nome = "Paulo",
                Cpf = "093.455.789-50",
                DataNascimento = Convert.ToDateTime("19/04/2000"),
                LimiteCredito = 190000,
                Email = "paulo.md10@gmail.com",
                Telefone = "991334785",
                Cep = "09456-293",
                Numero = 94,
                Bairro = "Escola Agricola",
                Cidade = "Blumenau",
                Uf = "SC",
                Complemento = "XX",
                RegistroAtivo = true,
            });
            clientesPessoaFisica.Add(new ClientePessoaFisica()
            {
                Id = 2,
                Nome = "João",
                Cpf = "033.555.119-22",
                DataNascimento = Convert.ToDateTime("09/08/1996"),
                LimiteCredito = -500000,
                Email = "jaoostein@gmail.com",
                Telefone = "994546776",
                Cep = "89031-492",
                Numero = 1152,
                Bairro = "Badenfurt",
                Cidade = "Blumenau",
                Uf = "SC",
                Complemento = "APTO-02",
                RegistroAtivo = true,
            });
            context.ClientesPessoasFisicas.AddRange(clientesPessoaFisica);
            #endregion

            #region clientesPessoasJuridicas
            var clientesPessoaJuridica = new List<ClientePessoaJuridica>();
            clientesPessoaJuridica.Add(new ClientePessoaJuridica()
            {
                Id = 1,
                RazaoSocial = "First",
                Atividade = "Sistemas e SoftWares",
                NomeFantasia = "Financial Report System",
                DataCadastro = Convert.ToDateTime("04/09/2019"),
                Cnpj = "83.590.870/0001-95",
                Email = "first@outlook.com",
                Filial = "Hbsis",
                Telefone = "3345-5567",
                Cep = "09432-876",
                Logradouro = "Ubatuba",
                Numero= 675,
                Bairro="Bairro Vila Olimpia",
                Uf="SP",
                Cidade="São Paulo",
                RegistroAtivo = true, 

            });

            clientesPessoaJuridica.Add(new ClientePessoaJuridica()
            {
                Id = 2,
                RazaoSocial = "HBSIS",
                Atividade = "Sistemas e SoftWares",
                NomeFantasia = "HBSIS",
                DataCadastro = Convert.ToDateTime("14/06/2009"),
                Cnpj = "83.590.870/0001-95",
                Email = "HBSIS@gmail.com",
                Filial = "XX",
                Telefone = "3345-5567",
                Cep = "09432-876",
                Logradouro = "XX",
                Numero = 675,
                Bairro = "Bairro Vila Olimpia",
                Uf = "SP",
                Cidade = "São Paulo",
                RegistroAtivo = true,
            });
            context.ClientesPessoasJuridicas.AddRange(clientesPessoaJuridica);
            #endregion

            #region contaCorrente
            var contaCorrente = new List<ContaCorrente>();
            contaCorrente.Add(new ContaCorrente()
            {
                NumeroConta = "1233334-454",
                Descricao = "Cliente há 25 anos",
                Documento = "Este é Paulo",
                TipoReceitaDespesa = 11,
                TipoPagamento = "Crédito",
                Valor = 20,
                Status = "Pago",
                DataLancamento = Convert.ToDateTime("19/08/2019"),
                DataRecebimento = Convert.ToDateTime("15/09/2019"),
                DataVencimento = Convert.ToDateTime("19/09/2019"),
            });
            #endregion

            #region endereço
            var enderecos = new List<Endereco>();
            enderecos.Add(new Endereco()
            {
                Email = "paulo.md10@gmail.com",
                Telefone = "988575072",
                Cep = "89031-492",
                Logradouro = "XX",
                Numero = 88,
                Bairro = "Vila Nova",
                Cidade = "Bluemanu",
                Uf = "SC",
                Complemento = "Bloco-7",
                RegistroAtivo = true

            });

            enderecos.Add(new Endereco()
            {
                Email = "juquinha@hotmail.com",
                Telefone = "987234573",
                Cep = "56432-452",
                Logradouro = "XX",
                Numero = 142,
                Bairro = "itoupava Norte",
                Cidade = "Bluemanu",
                Uf = "SC",
                Complemento = "Rua da Direita",
                RegistroAtivo = true
            });
            #endregion

            //#region fornecedor
            // var fornecedor = new List<Fornecedor>();
            // fornecedor.Add(new Fornecedor()
            // {
            //     RazaoSocial = "Benner",
            //     NomeFantasia = "Paulo",
            //     DataCadastro = Convert.ToDateTime("19/08/2005"),
            //     Cnpj = "93.591.110/0001-56",
            //     RegistroAtivo = true,
            // });
            // fornecedor.Add(new Fornecedor()
            // {
            //     RazaoSocial = "HBSIS",
            //     NomeFantasia = "Francisco",
            //     DataCadastro = Convert.ToDateTime("20/07/2015"),
            //     Cnpj = "39.552.667/0001-32",
            //     RegistroAtivo = true,
            // });

            //#endregion

            #region funcionario
            var funcionarios = new List<Funcionario>();
            funcionarios.Add(new Funcionario()
            {
                NomeFuncionario = "João Stein",
                TipoFuncionario = "Gerente",
                Usuario = "Joao",
                Senha = "123",
                RegistroAtivo = true

            });
            funcionarios.Add(new Funcionario()
            {
                NomeFuncionario = "André",
                TipoFuncionario = "Funcionario",
                Usuario = "andrezinho",
                Senha = "123",
                RegistroAtivo = true

            });
            context.Funcionarios.AddRange(funcionarios);
            #endregion

            #region historico
            var historico = new List<Historico>();
            historico.Add(new Historico()
            {
                Descricao = "Conta adicionada dia 19/07/2012",
                RegistroAtivo = true
            });
            historico.Add(new Historico()
            {
                Descricao = "Conta paga com sucesso",
                RegistroAtivo = true
            });
            historico.Add(new Historico()
            {
                Descricao = "Conta em atraso, pagar até dia 29/08/1996",
                RegistroAtivo = true
            });
            #endregion

            #region movimentacaoFinanceiraEntrada
            var movimentacaoFinanceiraEntrada = new List<MovimentacaoFinanceiraEntrada>();
            movimentacaoFinanceiraEntrada.Add(new MovimentacaoFinanceiraEntrada()
            {
                Valor = 568,
                RegistroAtivo = true
            });
            movimentacaoFinanceiraEntrada.Add(new MovimentacaoFinanceiraEntrada()
            {
                Valor = -2422,
                RegistroAtivo = true,
            });
            
            movimentacaoFinanceiraEntrada.Add(new MovimentacaoFinanceiraEntrada()
            {
                Valor = 255244,
                RegistroAtivo = true,
            });

            #endregion

            #region movimentacaoFinanceiraSaida
            var movimentacaoFinanceiraSaida = new List<MovimentacaoFinanceiraSaida>();
            movimentacaoFinanceiraSaida.Add(new MovimentacaoFinanceiraSaida()
            {
                Valor = 77,
                RegistroAtivo = true
            });
            movimentacaoFinanceiraSaida.Add(new MovimentacaoFinanceiraSaida()
            {
                Valor = -7555,
                RegistroAtivo = true
            });
            movimentacaoFinanceiraSaida.Add(new MovimentacaoFinanceiraSaida()
            {
                Valor = 72866457,
                RegistroAtivo = true
            });
            #endregion

            #region parcelaPagar
            var parcelaPagar = new List<ParcelaPagar>();
            parcelaPagar.Add(new ParcelaPagar()
            {
                Valor = 2333,
                Status = "Pago",
                DataPagamento = Convert.ToDateTime("17/02/2019"),
                DataVencimento = Convert.ToDateTime("17/02/2019"),
                RegistroAtivo = true
            });
            parcelaPagar.Add(new ParcelaPagar()
            {
                Valor = 9523,
                Status = "Pendente",
                DataPagamento = Convert.ToDateTime("05/09/2019"),
                DataVencimento = Convert.ToDateTime("04/09/2019"),
                RegistroAtivo = true
            });
            #endregion

            #region parcelaReceber
            var parcelaReceber = new List<ParcelaReceber>();
            parcelaReceber.Add(new ParcelaReceber()
            {
                Valor = 12312,
                Status = "Vencido",
                DataVencimento = Convert.ToDateTime("01/01/2019"),
                DataRecebimento = Convert.ToDateTime("02/02/2019"),
                RegistroAtivo = true,
            });
            parcelaReceber.Add(new ParcelaReceber()
            {
                Valor = 18657328,
                Status = "Pago",
                DataVencimento = Convert.ToDateTime("13/08/2018"),
                DataRecebimento = Convert.ToDateTime("05/08/2018"),
                RegistroAtivo = true,
            });
                #endregion ParcelaReceber

            #region Historicos
            var historicos = new List<Historico>();
            historicos.Add(new Historico()
            {
                Id = 1, 
                Descricao = "Manuteção",
                RegistroAtivo = true
            });
            context.Historicos.AddRange(historicos);
            #endregion Historicos

            #region tituloPagar
            var titulosPagar = new List<TituloPagar>();
            titulosPagar.Add(new TituloPagar()
            {
                Id = 1,
                IdFornecedor = 1,
                IdCategoriaDespesa = 1,
                Descricao = "Sem Descrição",
                FormaPagamento = "Dinheiro",
                Caixa = true,
                ValorTotal = 1999,
                Status = "Pago",
                DataLancamento = Convert.ToDateTime("23/06/2016"),
                DataRecebimento = Convert.ToDateTime("22/07/2016"),
                DataVencimento = Convert.ToDateTime("23/07/2016"),
                Complemento = "Usuario pagou corretamente",
                QuantidadeParcela = 1,
                RegistroAtivo = true
            });
            titulosPagar.Add(new TituloPagar()
            {
                Id = 2,
                IdFornecedor = 2,
                IdCategoriaDespesa = 2,
                Descricao = "Sem Descrição",
                FormaPagamento = "Credito",
                Caixa = false,
                ValorTotal = 127422,
                Status = "Pendente",
                DataLancamento = Convert.ToDateTime("13/06/2016"),
                DataRecebimento = Convert.ToDateTime("12/07/2019"),
                DataVencimento = Convert.ToDateTime("13/07/2016"),
                Complemento = "Usuario nao pagou",
                QuantidadeParcela = 6,
                RegistroAtivo = true
            });
            context.TitulosPagar.AddRange(titulosPagar);
            #endregion

            #region tituloReceber
            var titulosReceber = new List<TituloReceber>();
            titulosReceber.Add(new TituloReceber()
            {
                Id = 1,
                IdClientePessoaFisica = 1,
                IdCategoriaReceita = 1,
                Descricao= "Titulo sem compromisso",
                ValorTotal = 123213123,
                Status = "Pago",
                DataLancamento = new DateTime(2018, 12, 29),
                DataRecebimento = new DateTime(2019, 01, 04),
                DataVencimento = new DateTime(2019, 01, 30),
                Complemento="Não sei o que por",
                QuantidadeParcela= 36,
                RegistroAtivo = true
            });
            titulosReceber.Add(new TituloReceber()
            {
                Id = 2,
                IdClientePessoaJuridica = 2,
                IdCategoriaReceita = 2,
                Descricao = "Titulo com compromisso",
                ValorTotal = 343234,
                Status = "Pendente",
                DataLancamento = new DateTime(2017, 02, 09),
                DataRecebimento = null,
                DataVencimento = new DateTime(2017, 03, 10),
                Complemento = "Não sei o que por, desculpa",
                QuantidadeParcela = 24,
                RegistroAtivo = true
            });
            context.TitulosReceber.AddRange(titulosReceber);
            #endregion

            #region fornecedores
            var fornecedores = new List<Fornecedor>();
            fornecedores.Add(new Fornecedor()
            {
                RazaoSocial = "Peugeot",
                NomeFantasia = "strabourg",
                DataCadastro = Convert.ToDateTime("04/09/2019"),
                Cnpj = "83.590.870/0001-95",
                Email = "first@outlook.com",
                Telefone = "3345-5567",
                Cep = "09432-876",
                Logradouro = "UBATUBA",
                Numero = 675,
                Bairro = "Bairro Vila Olimpia",
                Cidade = "São Paulo",
                Uf = "SP",
                Complemento = "casa",
                RegistroAtivo = true,
            });
            fornecedores.Add(new Fornecedor()
            {
                RazaoSocial = "Honda",
                NomeFantasia = "Hodinha",
                DataCadastro = Convert.ToDateTime("04/09/2019"),
                Cnpj = "83.590.870/0001-95",
                Email = "first@outlook.com",
                Telefone = "3345-5567",
                Cep = "09432-876",
                Logradouro = "UBATUBA",
                Numero = 675,
                Bairro = "Bairro Vila Olimpia",
                Cidade = "São Paulo",
                Uf = "SP",
                Complemento = "casa",
                RegistroAtivo = true,
            });
            context.Fornecedores.AddRange(fornecedores);
            #endregion


            base.Seed(context);
        }

    }
}