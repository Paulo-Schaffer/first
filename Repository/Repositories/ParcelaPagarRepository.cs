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
        public void GerarParcelas(decimal valor, int quantidadesPacelas, int idTituloPagar)
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
