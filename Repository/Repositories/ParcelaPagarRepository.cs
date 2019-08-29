using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    class ParcelaPagarRepository : IParcelaPagarRepository
    {
        private SistemaContext context;

        public ParcelaPagarRepository()
        {
            context = new SistemaContext(); 
        }
        public bool Alterar(ParcelaPagar parcelaPagar)
        {
            throw new NotImplementedException();
        }

        public bool Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public int Inserir(ParcelaPagar parcelaPagar)
        {
            throw new NotImplementedException();
        }

        public ParcelaPagar ObterPeloId(int id)
        {
            throw new NotImplementedException();
        }

        public List<ParcelaPagar> ObterTodos()
        {
            throw new NotImplementedException();
        }
    }
}
