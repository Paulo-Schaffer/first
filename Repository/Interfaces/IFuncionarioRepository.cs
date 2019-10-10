using Model;
using System.Collections.Generic;

namespace Repository.Interfaces
{
   public interface IFuncionarioRepository
    {
        int Inserir(Funcionario funcionario);

        bool Alterar(Funcionario funcionario);

        List<Funcionario> ObterTodos();

        bool Apagar(int id);

        Funcionario ObterPeloId(int id);
    }
}
