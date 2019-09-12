using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface ICadastroContaCorrente
    {
        int Inserir(CadastroContaCorrente cadastrosContaCorrente);

        bool Alterar(CadastroContaCorrente cadastrosContaCorrente);

        bool Apagar(int id);

        List<Fornecedor> ObterTodos(string busca);

        Fornecedor ObterPeloId(int id);
    }
}
