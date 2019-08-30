using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class CategoriaReceitaRepository : ICategoriaReceitaRepository
    {
        private SistemaContext context;

        public CategoriaReceitaRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(CategoriaReceita categoriaReceita)
        {
            var categoriaCorreta = context.CategoriasReceitas.FirstOrDefault(x => x.Id == categoriaReceita.Id);
            if (categoriaCorreta == null)
                return false;
            //categoriaCorreta.
            throw new NotImplementedException();
        }

        public bool Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public int Inserir(CategoriaReceita categoriaReceita)
        {
            throw new NotImplementedException();
        }

        public CategoriaReceita ObterPeloId(int id)
        {
            throw new NotImplementedException();
        }

        public List<CategoriaReceita> ObterTodos()
        {
            throw new NotImplementedException();
        }
    }
}
