using Model;
using System.Collections.Generic;

namespace Repository.Interfaces
{
    interface ICategoriaReceitaRepository
    {
        int Inserir(CategoriaReceita categoriaReceita);

        bool Alterar(CategoriaReceita categoriaReceita);

        List<CategoriaReceita> ObterTodos();

        bool Apagar(int id);

        CategoriaReceita ObterPeloId(int id);
    }
}
