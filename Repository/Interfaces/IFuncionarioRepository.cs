using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
