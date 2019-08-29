using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class TituloPagarRepository : ITituloPagarRepository
    {
        private SistemaContext context;

        public TituloPagarRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(TituloPagar tituloPagar)
        {
            throw new NotImplementedException();
        }

        public bool Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public int Inserir(TituloPagar tituloPagar)
        {
            tituloPagar.RegistroAtivo = true;
            context.TitulosPagar.Add(tituloPagar);
            context.SaveChanges();
            return tituloPagar.Id;
        }

        public TituloPagar ObterPeloId(int id)
        {
            return context.TitulosPagar
                .Include("TituloPagar")
                .FirstOrDefault(x => x.Id == id);
        }

        public List<TituloPagar> ObterTodos()
        {
            return context.TitulosPagar
                .Where(x => x.RegistroAtivo == true)
                .OrderBy(x => x.Id).ToList();
        }

        public List<TituloPagar> ObterTodosSelect2(string pesquisa)
        {
            throw new NotImplementedException();
        }
    }
}
