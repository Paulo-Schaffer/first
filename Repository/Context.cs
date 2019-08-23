using Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class Context : DbContext
    {
        public Context() : base("DBTCCFirst")
        {
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<Context,
            //TccFirst.Migrations.Configuration>());
        }

        public DbSet<Agencia> Agencias { get; set; }

        public DbSet<Caixa> Caixas { get; set; }

        public DbSet<CategoriaDespesa> CategoriaDespesas { get; set; }

        public DbSet<CategoriaReceita> CategoriaReceitas { get; set; }

        public DbSet<ClientePessoaFisica> ClientePessoaFisicas { get; set; }

        public DbSet<ClientePessoaJuridica> ClientePessoaJuridicas { get; set; }

        public DbSet<ContaCorrente> ContaCorrentes { get; set; }

        public DbSet<Fornecedor> Fornecedors { get; set; }

        public DbSet<Funcionario> Funcionarios { get; set; }

        public DbSet<Historico> Historicos { get; set; }

        public DbSet<Login> Logins { get; set; }

        public DbSet<MovimentacaoFinanceiraEntrada> MovimentacaoFinanceiraEntradas { get; set; }

        public DbSet<MovimentacaoFinanceiraSaida> MovimentacaoFinanceiraSaidas { get; set; }

        public DbSet<ParcelaPagar> ParcelasPagar { get; set; }

        public DbSet<ParcelaReceber> ParcelasReceber { get; set; }

        public DbSet<TituloPagar> TitulosPagar { get; set; }

        public DbSet<TituloReceber> TitulosReceber { get; set; }

    }
}
