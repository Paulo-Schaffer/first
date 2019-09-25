using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
   public class ParcelaReceberRepository : IParcelaReceberRepository
    {
        private SistemaContext context;

        public ParcelaReceberRepository()
        {
            context = new SistemaContext();
        }

        public void GerarParcelas(decimal valor, int quantidadesPacelas, int idTituloReceber)
        {
            var parcelaReceberOriginal = context.ParcelasReceber. Where(x => x.Id == parcelaReceber.Id)
                 .FirstOrDefault();
            if (parcelaReceber == null)
            {
                return false;
            }
            parcelaReceberOriginal.IdTituloReceber = parcelaReceber.IdTituloReceber;
            parcelaReceberOriginal.Valor = parcelaReceber.Valor;
            parcelaReceberOriginal.Status = parcelaReceber.Status;
            parcelaReceberOriginal.DataVencimento = parcelaReceber.DataVencimento;
            parcelaReceberOriginal.DataRecebimento = parcelaReceber.DataRecebimento;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

            for (int i = 0; i < quantidadesPacelas; i++)
            {
                var dataVencimento = dataAtual.AddMonths(i);

                var parcela = new ParcelaReceber();
                parcela.Valor = valor;
                parcela.DataVencimento = dataVencimento;
                parcela.IdTituloReceber = idTituloReceber;
                parcela.RegistroAtivo = true;
                context.ParcelasReceber.Add(parcela);
                context.SaveChanges();
            }
        }

        public ParcelaReceber ObterPeloId(int id)
        {
            var parcela = context.ParcelasReceber.Where(x => x.Id == id).FirstOrDefault();
            return parcela;
        }

        public List<ParcelaReceber> ObterTodos()
        {
            return context.ParcelasReceber
              .Where(x => x.RegistroAtivo == true)
              .ToList();
        }
    }
}
