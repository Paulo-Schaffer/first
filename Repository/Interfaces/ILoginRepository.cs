using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface ILoginRepository
    {
        int Inserir(Login login);

        bool Alterar(Login login);

        List<Login> ObterTodos();

        bool Apagar(int id);

        Login ObterPeloId(int id);

    }
}
