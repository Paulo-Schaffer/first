using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface ITituloPagarRepository
    {
        int Inserir(TituloPagar tituloPagar);

        bool Alterar(TituloPagar tituloPagar);

        List<TituloPagar> ObterTodos();

        TituloPagar ObterPeloId(int id);

        bool Apagar(int id);

        List<TituloPagar> ObterTodosSelect2(string pesquisa);
    }
}
