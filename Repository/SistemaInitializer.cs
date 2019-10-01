using Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace Repository
{
 //   internal class SistemaInitializer : CreateDatabaseIfNotExists<SistemaContext>
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



            #region tituloReceber
            var tituloReceber = new List<TituloReceber>();
            tituloReceber.Add(new TituloReceber()
            {
                Descricao = "Titulo sem compromisso",
                ValorTotal = 125,
                Status = "Pago",
                DataLancamento = Convert.ToDateTime("13/06/2016"),
                DataRecebimento = Convert.ToDateTime("12/07/2019"),
                DataVencimento = Convert.ToDateTime("13/07/2016"),
                QuantidadeParcela = 36,
                RegistroAtivo = true
            });
            tituloReceber.Add(new TituloReceber()
            {
                Descricao = "Titulo com compromisso",
                ValorTotal = 175,
                Status = "Pendente",
                DataLancamento = Convert.ToDateTime("13/06/2016"),
                DataRecebimento = Convert.ToDateTime("12/07/2019"),
                DataVencimento = Convert.ToDateTime("13/07/2016"),
                QuantidadeParcela = 24,
                RegistroAtivo = true
            });
            context.TitulosReceber.AddRange(tituloReceber);
            #endregion

            base.Seed(context);
        }

    }
}