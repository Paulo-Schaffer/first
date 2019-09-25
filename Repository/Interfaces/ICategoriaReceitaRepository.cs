using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
