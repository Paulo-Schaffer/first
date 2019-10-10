using Model;
using System.Collections.Generic;

namespace Repository.Interfaces
{
    public interface IParcelaReceberRepository
    {
        void GerarParcelas(int idTituloReceber);

        List<ParcelaReceber> ObterTodos(int idTituloReceber);

        ParcelaReceber ObterPeloId(int id);
    }
}
