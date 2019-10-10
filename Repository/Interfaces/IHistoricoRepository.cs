using Model;
using System.Collections.Generic;

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
