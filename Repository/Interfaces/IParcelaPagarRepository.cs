using Model;
using System.Collections.Generic;

namespace Repository.Interfaces
{
    public interface IParcelaPagarRepository
    {
        void GerarParcelas(int idTituloPagar);

        List<ParcelaPagar> ObterTodos(int idTitloPagar);

        ParcelaPagar ObterPeloId(int id);
    }
}
