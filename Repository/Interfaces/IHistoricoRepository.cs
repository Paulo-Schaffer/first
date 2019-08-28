using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
   public interface IHistoricoRepository
    {
        int Inserir(Historico historico);

        bool Alterar(Historico historico);

        List<Historico> ObterTodos();

        bool Apagar(int id);

        Historico ObterPeloId(int id);
    }
}
