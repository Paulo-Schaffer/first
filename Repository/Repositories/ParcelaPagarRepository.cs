using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class ParcelaPagarRepository : IParcelaPagarRepository
    {
        private SistemaContext context;

        public ParcelaPagarRepository()
        {
            context = new SistemaContext(); 
        }

        public bool Alterar(ParcelaPagar parcelaPagar)
        {
            var parcelaPagarOriginal = context.ParcelasPagar.FirstOrDefault(x => x.Id == parcelaPagar.Id);

            if (parcelaPagarOriginal == null)
                return false;

            parcelaPagarOriginal.Valor = parcelaPagar.Valor;
            parcelaPagarOriginal.Status = parcelaPagar.Status;
            parcelaPagarOriginal.DataVencimento = parcelaPagar.DataVencimento;
            parcelaPagarOriginal.DataPagamento =parcelaPagar.DataPagamento;
            int quantidadeAfetada = context.SaveChanges();  
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var parcelaPagar = context.ParcelasPagar.FirstOrDefault(x => x.Id == id);

            if (parcelaPagar == null)
            {
                return false;
            }


            parcelaPagar.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(ParcelaPagar parcelaPagar)
        {
            context.ParcelasPagar.Add(parcelaPagar);
            context.SaveChanges();
            return parcelaPagar.Id;
        }

        public ParcelaPagar ObterPeloId(int id)
        {
            var parcelaPagar = context.ParcelasPagar.FirstOrDefault(x => x.Id == id);
            return parcelaPagar;

        }

        public List<ParcelaPagar> ObterTodos()
        {
            return context.ParcelasPagar.Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();

        }
    }
}
