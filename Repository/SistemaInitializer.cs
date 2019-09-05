using Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace Repository
{
    //internal class SistemaInitializer : CreateDatabaseIfNotExists<SistemaContext>
    internal class SistemaInitializer : DropCreateDatabaseAlways<SistemaContext>
    {
        protected override void Seed(SistemaContext context)
        {
            #region agencias
            var agencias = new List<Agencia>();
            agencias.Add(new Agencia()
            {
                NomeAgencia = "Agencia da Vida",
                NumeroAgencia = "2001",
                Banco = "Banco de Vida",
                RegistroAtivo = true
            });


            agencias.Add(new Agencia()
            {
                NomeAgencia = "Você consegue",
                NumeroAgencia = "8001",
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
            #endregion

            #region categoriaReceita
            var categoriaReceita = new List<CategoriaReceita>();
            categoriaReceita.Add(new CategoriaReceita()
            {
                TipoCategoriaReceita = "Despesa com Funcionário",
                RegistroAtivo = true,
            });
            categoriaReceita.Add(new CategoriaReceita()
            {
                TipoCategoriaReceita = "Despesa com Lanche",
                RegistroAtivo = true,
            });
            #endregion

            #region clientePessoaFisica

            var clientePessoaFisica = new List<ClientePessoaFisica>();
            clientePessoaFisica.Add(new ClientePessoaFisica()
            {
                Nome = "Paulo",
                Cpf = "093.455.789-50",
                DataNascimento = Convert.ToDateTime("19/04/2000"),
                LimiteCredito = 190000,
                Email = "paulo.md10@gmail.com",
                Telefone= "991334785",
                Cep="09456-293",
                Numero = 94,
                Bairro = "Escola Agricola",
                Cidade = "Blumenau",
                Uf= "SC",
                Complemento = "XX",
                RegistroAtivo = true,
            });
            clientePessoaFisica.Add(new ClientePessoaFisica()
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

            #endregion

            #region clientePessoaJuridica
            var clientePessoaJuridica = new List<ClientePessoaJuridica>();
            clientePessoaJuridica.Add(new ClientePessoaJuridica()
            {
                RazaoSocial = "First",
                Atividade = "Sistemas e SoftWares",
                NomeFantasia = "Financial Report System",
                DataCadastro = Convert.ToDateTime("04/09/2019"),
                Cnpj = "83.590.870/0001-95",
                Email= "first@outlook.com",
                Filial = "Hbsis",
                Telefone = "3345-5567",
                Cep = "09432-876",
                Logradouro = "XX",
                Numero= 675,
                Bairro="Bairro Vila Olimpia",
                Uf="SP",
                Cidade="São Paulo",
                RegistroAtivo = true, 

            });
            clientePessoaJuridica.Add(new ClientePessoaJuridica()
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

            #endregion

            #region contaCorrente
            var contaCorrente = new List<ContaCorrente>();
            contaCorrente.Add(new ContaCorrente() {
                NumeroConta= "1233334-454",
                Descricao = "Cliente há 25 anos",
                Documento= "Este é Paulo",
                TipoReceitaDespesa = 11,
                TipoPagamento = "Crédito",
                Valor = 20,
                Status = "Pago",
                DataLancamento= Convert.ToDateTime("19/08/2019"),
                DataRecebimento= Convert.ToDateTime("15/09/2019"),
                DataVencimento= Convert.ToDateTime("19/09/2019"),
            });
            #endregion


            base.Seed(context);
        }

    }
}