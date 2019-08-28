using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface IFuncionarioRepository
    {
        int Inserir(Funcionario funcionario);

        bool Alterar(Funcionario funcionario);

        List<Funcionario> ObterTodos();

        Funcionario ObterPeloId(int id);

        bool Apagar(int id);

        List<Funcionario> ObterTodosSelect2(string pesquisa);
    }
}
