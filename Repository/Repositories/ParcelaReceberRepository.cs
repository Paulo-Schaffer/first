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

        public void GerarParcelas(decimal valor, int quantidadesPacelas, int idTituloReceber)
        {
            throw new NotImplementedException();
        }

        public ParcelaReceber ObterPeloId(int id)
        {
            throw new NotImplementedException();
        }

        public List<ParcelaReceber> ObterTodos(int idTitloPagar)
        {
            throw new NotImplementedException();
        }
    }
}
