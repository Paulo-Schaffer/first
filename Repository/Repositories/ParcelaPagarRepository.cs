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

        public bool Apagar(int id)
        {
            var parcelaPagar = context.ParcelasPagar.FirstOrDefault(x => x.Id == id);

        public void GerarParcelas(decimal valor, int quantidadesPacelas, int idTituloPagar)
        {
            var dataAtual = DateTime.Now.AddDays(30);


            parcelaPagar.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }


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
