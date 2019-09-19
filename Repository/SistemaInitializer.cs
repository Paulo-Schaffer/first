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

            #region categoriaDespesa
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

            #region categoriaReceita
            var categoriaReceita = new List<CategoriaReceita>();
            categoriaReceita.Add(new CategoriaReceita()
            {
                TipoCategoriaReceita = "Despesa com Paulo",
                RegistroAtivo = true,
            });
            categoriaReceita.Add(new CategoriaReceita()
            {
                TipoCategoriaReceita = "Despesa com Joao",
                RegistroAtivo = true,
            });
            context.CategoriasReceitas.AddRange(categoriaReceita);
            #endregion

            #region clientePessoaFisica

            var clientesPessoaFisica = new List<ClientePessoaFisica>();
            clientesPessoaFisica.Add(new ClientePessoaFisica()
            {
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

            #region clientePessoaJuridica
            var clientesPessoaJuridica = new List<ClientePessoaJuridica>();
            clientesPessoaJuridica.Add(new ClientePessoaJuridica()
            {
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
                Numero = 675,
                Bairro = "Bairro Vila Olimpia",
                Uf = "SP",
                Cidade = "São Paulo",
                RegistroAtivo = true,

            });

            clientesPessoaJuridica.Add(new ClientePessoaJuridica()
            {
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

            #region tituloPagar
            var tituloPagar = new List<TituloPagar>();
            tituloPagar.Add(new TituloPagar()
            {
                Descricao = "Titulo feio por Paulo",
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
            tituloPagar.Add(new TituloPagar()
            {
                Descricao = "Titulo feio por Paulo",
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
            #endregion

            #region cadastrocontacorrente
            var cadastroscontacorrente = new List<CadastroContaCorrente>();
            cadastroscontacorrente.Add(new CadastroContaCorrente() {
                NumeroConta = 80,
                IdAgencia = 1,
                RegistroAtivo = true,
            });
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
                context.Fornecedores.AddRange(fornecedores);
            #endregion

            #region historico
            var historico = new List<Historico>();
            historico.Add(new Historico()
            {
                Descricao = "Conta adicionada dia 19/07/2000",
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
            context.Historicos.AddRange(historico);
            #endregion
      
            #region parcelaPagar
            var parcelaPagar = new List<ParcelaPagar>();
            parcelaPagar.Add(new ParcelaPagar()
            {
                Valor = 2333,
                Status = "Pago",
                DataVencimento = Convert.ToDateTime("17/02/2019"),
                DataPagamento = Convert.ToDateTime("17/02/2019"),
                RegistroAtivo = true
            });
            parcelaPagar.Add(new ParcelaPagar()
            {
                Valor = 9523,
                Status = "Pendente",
                DataVencimento = Convert.ToDateTime("04/09/2019"),
                DataPagamento = Convert.ToDateTime("05/09/2019"),
                RegistroAtivo = true
            });
            context.ParcelasPagar.AddRange(parcelaPagar);
            #endregion

            #region funcionario
            var funcionarios = new List<Funcionario>();
            funcionarios.Add(new Funcionario()
            {
                NomeFuncionario = "João Stein",
                TipoFuncionario = "Gerente",
                Usuario = "Joao",
                Senha = "123456",
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
            funcionarios.Add(new Funcionario()
            {
                NomeFuncionario = "Paulo",
                TipoFuncionario = "Gerente",
                Usuario = "Paulo",
                Senha = "123",
                RegistroAtivo = true
            });
            funcionarios.Add(new Funcionario()
            {
                NomeFuncionario = "Gustavo",
                TipoFuncionario = "Gerente",
                Usuario = "Gustavo",
                Senha = "123",
                RegistroAtivo = true
            });
            funcionarios.Add(new Funcionario()
            {
                NomeFuncionario = "Paul",
                TipoFuncionario = "Gerente",
                Usuario = "Paul",
                Senha = "123",
                RegistroAtivo = true
            });
            funcionarios.Add(new Funcionario()
            {
                NomeFuncionario = "Cleber",
                TipoFuncionario = "Gerente",
                Usuario = "Cleber",
                Senha = "123",
                RegistroAtivo = true
            });
            context.Funcionarios.AddRange(funcionarios);
            #endregion



            base.Seed(context);
        }

    }
}