using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    class LoginRepository : ILoginRepository
    {
        public bool Alterar(Login login)
        {
            throw new NotImplementedException();
        }

        public bool Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public int Inserir(Login login)
        {
            throw new NotImplementedException();
        }

        public Login ObterPeloId(int id)
        {
            throw new NotImplementedException();
        }

        public List<Login> ObterTodos()
        {
            throw new NotImplementedException();
        }

        public List<Login> ObterTodosSelect2(string pesquisa)
        {
            throw new NotImplementedException();
        }
    }
}
