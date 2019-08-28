using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class TituloReceberRepository : ITituloReceberRepository
    {
        private SistemaContext context;
      
        public bool Alterar(TituloReceber tituloReceber)
        {
            throw new NotImplementedException();
        }

        public bool Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public int Inserir(TituloReceber tituloReceber)
        {
            throw new NotImplementedException();
        }

        public TituloReceber ObterPeloId(int id)
        {
            throw new NotImplementedException();
        }

        public List<TituloReceber> ObterTodos()
        {
            throw new NotImplementedException();
        }
    }
}
