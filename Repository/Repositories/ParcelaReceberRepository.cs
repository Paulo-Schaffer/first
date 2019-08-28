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
            throw new NotImplementedException();
        }

        public bool Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public int Inserir(ParcelaReceber parcelareceber)
        {
            throw new NotImplementedException();
        }

        public ParcelaReceber ObterPeloId(int id)
        {
            throw new NotImplementedException();
        }

        public List<ParcelaReceber> ObterTodos()
        {
            throw new NotImplementedException();
        }
    }
}
