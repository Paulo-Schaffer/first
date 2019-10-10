using Model;
using System.Collections.Generic;

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
