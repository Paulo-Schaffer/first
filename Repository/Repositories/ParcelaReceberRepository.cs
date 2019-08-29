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


        public bool Alterar(ParcelaReceber parcelareceber)
        {
            var parcelaReceberOriginal = context.ParcelasReceber
                 .Where(x => x.Id == parcelareceber.Id)
                 .FirstOrDefault();
            if (parcelaReceberOriginal == null)
            {
                return false;
            }
            parcelaReceberOriginal.Valor = parcelareceber.Valor;
            parcelaReceberOriginal.Status = parcelareceber.Status;
            parcelaReceberOriginal.DataVencimento = parcelareceber.DataVencimento;
            parcelaReceberOriginal.DataRecebimento = parcelareceber.DataRecebimento;
            parcelareceber.IdTituloReceber = parcelareceber.IdTituloReceber;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var parcelaReceber = context.ParcelasReceber.FirstOrDefault(x => x.Id == id);
            if (parcelaReceber == null)
            {
                return false;
            }
            parcelaReceber.RegistroAtivo = false;
            context.SaveChanges();
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(ParcelaReceber parcelareceber)
        {
            context.ParcelasReceber.Add(parcelareceber);
            context.SaveChanges();
            return parcelareceber.Id;
        }

        public ParcelaReceber ObterPeloId(int id)
        {
            var parcelaReceber = context.ParcelasReceber
                  .Where(x => x.Id == id)
                  .FirstOrDefault(x => x.Id == id);
            return parcelaReceber;
        }

        public List<ParcelaReceber> ObterTodos()
        {
            return context.ParcelasReceber
              .Where(x => x.RegistroAtivo == true)
              .OrderBy(x => x.Status)
              .ToList();
        }
    }
}
