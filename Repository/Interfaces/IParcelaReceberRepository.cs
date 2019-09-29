using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IParcelaReceberRepository
    {
        void GerarParcelas(int idTituloReceber);


        List<ParcelaReceber> ObterTodos(int idTitloPagar);


        ParcelaReceber ObterPeloId(int id);
    }
}
