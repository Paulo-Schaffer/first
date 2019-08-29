using Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    class SistemaContext : DbContext
    {
        public DbSet<TituloPagar> TitulosPagar { get; set; }

        public SistemaContext():base ("TCCFirst")
        {

        }
        public DbSet<Agencia> Agencias { get; set; }
        public DbSet<Caixa> Caixas { get; set; }
        public DbSet<CategoriaDespesa> CategoriasDespesas { get; set; }
        public DbSet<CategoriaReceita> CategoriasReceitas { get; set; }
        public DbSet<ClientePessoaJuridica> ClientesPessoasJuridicas { get; set; }
        public DbSet<ClientePessoaFisica> ClientesPessoasFisicas { get; set; }
        public DbSet<ContaCorrente> ContasCorrentes { get; set; }
        public DbSet<Fornecedor> Fornecedores { get; set; }
        public DbSet<Funcionario> Funcionarios { get; set; }
        public DbSet<Historico> Historicos { get; set; }
        public DbSet<Login> Logins { get; set; }
        public DbSet<MovimentacaoFinanceiraEntrada> MovimentacaoFinanceiraEntradas { get; set; }
        public DbSet<MovimentacaoFinanceiraSaida> MovimentacaoFinanceiraSaidas { get; set; }
        public DbSet<ParcelaReceber> ParcelasReceber { get; set; }
        public DbSet<ParcelaPagar> ParcelasPagar { get; set; }
        public DbSet<TituloPagar> TitulosPagar { get; set; }
        public DbSet<TituloReceber> TitulosReceber { get; set; }
        public DbSet<TituloReceber> TitulosReceber { get; set; }
        public DbSet<MovimentacaoFinanceiraEntrada> MovimentacaoFinanceiraEntradas { get; set; }

        public DbSet<CategoriaDespesa> CategoriasDespesas { get; set; }

        public DbSet<Agencia> Agencias { get; set; }
        
        public DbSet<MovimentacaoFinanceiraEntrada> movimentacaoFinanceiraEntradas { get; set; }
        public DbSet<ParcelaReceber> ParcelasReceber { get; set; }

    }
}
