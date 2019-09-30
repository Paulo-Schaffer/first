using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IParcelaPagarRepository
    {
        void GerarParcelas(int idTitutloPagar); 

        List<ParcelaPagar> ObterTodos(int idTitloPagar);

        ParcelaPagar ObterPeloId(int id);
    }
}
