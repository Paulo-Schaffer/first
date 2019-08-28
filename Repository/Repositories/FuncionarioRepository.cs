using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    class FuncionarioRepository : IFuncionarioRepository
    {
        public bool Alterar(Funcionario funcionario)
        {
            throw new NotImplementedException();
        }

        public bool Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public int Inserir(Funcionario funcionario)
        {
            throw new NotImplementedException();
        }

        public Funcionario ObterPeloId(int id)
        {
            throw new NotImplementedException();
        }

        public List<Funcionario> ObterTodos()
        {
            throw new NotImplementedException();
        }

        public List<Funcionario> ObterTodosSelect2(string pesquisa)
        {
            throw new NotImplementedException();
        }
    }
}
