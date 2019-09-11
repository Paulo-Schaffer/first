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


        public bool Alterar(ParcelaReceber parcelaReceber)
        {
            var parcelaReceberOriginal = context.ParcelasReceber
                 .FirstOrDefault(x => x.Id == parcelaReceber.Id);
            if (parcelaReceber == null)
            {
                return false;
            }
            parcelaReceberOriginal.Valor = parcelaReceber.Valor;
            parcelaReceberOriginal.Status = parcelaReceber.Status;
            parcelaReceberOriginal.DataVencimento = parcelaReceber.DataVencimento;
            parcelaReceberOriginal.DataRecebimento = parcelaReceber.DataRecebimento;
            parcelaReceberOriginal.IdTituloReceber = parcelaReceber.IdTituloReceber;
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
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(ParcelaReceber parcelaReceber)
        {
            parcelaReceber.RegistroAtivo=true;
            context.ParcelasReceber.Add(parcelaReceber);
            context.SaveChanges();
            return parcelaReceber.Id;
        }

        public ParcelaReceber ObterPeloId(int id)
        {
            var parcelaReceber = context.ParcelasReceber
                  .Include("TitulosPagar")
                  .FirstOrDefault(x => x.Id == id);
            return parcelaReceber;
        }

        public List<ParcelaReceber> ObterTodos()
        {
            return context.ParcelasReceber
              .Where(x => x.RegistroAtivo == true)
              .OrderBy(x => x.Id)
              .ToList();
        }
    }
}
