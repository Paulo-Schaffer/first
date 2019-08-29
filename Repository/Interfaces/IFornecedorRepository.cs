using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface IFornecedorRepository
    {
        int Inserir(Fornecedor fornecedores);

        bool Alterar(Fornecedor fornecedores);

        bool Apagar(int id);

        List<Fornecedor> ObterTodos(string busca);

        Fornecedor ObterPeloId(int id);
    }
}
