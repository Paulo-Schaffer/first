using Model;
using System.Collections.Generic;

namespace Repository.Interfaces
{
    public interface ICadastroContaCorrenteRepository
    {
        int Inserir(CadastroContaCorrente cadastrosContaCorrente);

        bool Alterar(CadastroContaCorrente cadastrosContaCorrente);

        List<CadastroContaCorrente> ObterTodos();

        CadastroContaCorrente ObterPeloId(int id);

        bool Apagar(int id);
    }
}
