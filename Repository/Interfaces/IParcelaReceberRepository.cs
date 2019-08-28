using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface IParcelaReceberRepository
    {
        int Inserir(ParcelaReceber parcelareceber);

        bool Alterar(ParcelaReceber parcelareceber);

        List<ParcelaReceber> ObterTodos();

        bool Apagar(int id);

        ParcelaReceber ObterPeloId(int id);
    }
}
