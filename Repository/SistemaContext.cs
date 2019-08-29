using Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class SistemaContext : DbContext
    {
        public SistemaContext():base("SqlServerConnection")
        {
            Database.SetInitializer<SistemaContext>(null);
        }
        public DbSet<TituloPagar> tituloPagar { get; set; }
        public DbSet<TituloReceber> TitulosReceber { get; set; }
        public DbSet<MovimentacaoFinanceiraEntrada> MovimentacaoFinanceiraEntradas { get; set; }
        public DbSet<CategoriaDespesa> CategoriasDespesas { get; set; }
        public DbSet<Agencia> Agencias { get; set; }
        public DbSet<ParcelaReceber> ParcelaRecebers { get; set; }
        public DbSet<ClientePessoaJuridica> ClientesPessoaJuridica { get; set; }
    }
}
