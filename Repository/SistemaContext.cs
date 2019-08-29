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


        public DbSet<TituloReceber> TitulosReceber { get; set; }
        public DbSet<MovimentacaoFinanceiraEntrada> MovimentacaoFinanceiraEntradas { get; set; }
        public DbSet<CategoriaDespesa> CategoriasDespesas { get; set; }
        public DbSet<Agencia> Agencias { get; set; }
        public DbSet<MovimentacaoFinanceiraEntrada> movimentacaoFinanceiraEntradas { get; set; }
        public DbSet<ParcelaReceber> ParcelasReceber { get; set; }
        public DbSet<Caixa> Caixas { get;set }
    }
}
