using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface ILoginRepository
    {
        int Inserir(Login login);

        bool Alterar(Login login);

        List<Login> ObterTodos(
            int id,
            string usuario,
            string senha,
            int id_funcionario
        );

        Login ObterPeloId(int id);

        bool Apagar(int id);

        List<Login> ObterTodosSelect2(string pesquisa);
    }
}
