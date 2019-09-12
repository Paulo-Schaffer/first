using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class CadastroContaCorrenteRepository : ICadastroContaCorrente
    {
        private SistemaContext context;
        public CadastroContaCorrenteRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(CadastroContaCorrente cadastrosContaCorrente)
        {
            throw new NotImplementedException();
        }

        public bool Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public int Inserir(CadastroContaCorrente cadastrosContaCorrente)
        {
            throw new NotImplementedException();
        }

        public Fornecedor ObterPeloId(int id)
        {
            throw new NotImplementedException();
        }

        public List<Fornecedor> ObterTodos(string busca)
        {
            throw new NotImplementedException();
        }
    }
}
