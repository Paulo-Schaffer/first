using Model;
using System.Collections.Generic;

namespace Repository.Interfaces
{
    public interface IAgenciaRepository
    {
        int Inserir(Agencia agencia);

        bool Alterar(Agencia agencia);

        List<Agencia> ObterTodos();

        bool Apagar(int id);

        Agencia ObterPeloId(int id);
    }
}
