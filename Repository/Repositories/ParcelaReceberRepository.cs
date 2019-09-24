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
        public SistemaContext context;

        public ParcelaReceberRepository()
        {
            context = new SistemaContext();
        }


        public bool Alterar(ParcelaReceber parcelaReceber)
        {
            var parcelaReceberOriginal = context.ParcelasReceber. Where(x => x.Id == parcelaReceber.Id).FirstOrDefault();
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
            parcelaReceber.RegistroAtivo = true;
            context.ParcelasReceber.Add(parcelaReceber);
            context.SaveChanges();
            return parcelaReceber.Id;
        }

        public ParcelaReceber ObterPeloId(int id)
        {
            var parcelaReceber = context.ParcelasReceber
                  .Where(x => x.Id == id).FirstOrDefault();
            return parcelaReceber;
        }

        public List<ParcelaReceber> ObterTodos()
        {
            return context.ParcelasReceber
              .Include("TituloReceber")
              .Where(x => x.RegistroAtivo == true)
              .ToList();
        }
    }
}
