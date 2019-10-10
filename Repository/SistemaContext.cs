using Model;
using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Repository
{
    public class SistemaContext : DbContext
    {
        public SistemaContext():base ("TCCFirstDB")
        {
            Database.SetInitializer<SistemaContext>(new SistemaInitializer());
        }
        public DbSet<Agencia> Agencias { get; set; }
        public DbSet<Caixa> Caixas { get; set; }
        public DbSet<CategoriaDespesa> CategoriasDespesas { get; set; }
        public DbSet<CategoriaReceita> CategoriasReceitas { get; set; }
        public DbSet<ClientePessoaJuridica> ClientesPessoasJuridicas { get; set; }
        public DbSet<ClientePessoaFisica> ClientesPessoasFisicas { get; set; }
        public DbSet<Transacao> Transacoes { get; set; }
        public DbSet<Fornecedor> Fornecedores { get; set; }
        public DbSet<Funcionario> Funcionarios { get; set; }
        public DbSet<Historico> Historicos { get; set; }
        public DbSet<MovimentacaoFinanceiraEntrada> MovimentacaoFinanceiraEntradas { get; set; }
        public DbSet<MovimentacaoFinanceiraSaida> MovimentacaoFinanceiraSaidas { get; set; }
        public DbSet<ParcelaReceber> ParcelasReceber { get; set; }
        public DbSet<ParcelaPagar> ParcelasPagar { get; set; }
        public DbSet<TituloPagar> TitulosPagar { get; set; }
        public DbSet<TituloReceber> TitulosReceber { get; set; }
        public DbSet<CadastroContaCorrente> CadastroContaCorrentes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        }
    }
}
