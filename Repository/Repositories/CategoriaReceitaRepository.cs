using Model;
using Repository.Interfaces;
using System.Collections.Generic;
using System.Linq;

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
            categoriaCorreta.TipoCategoriaReceita = categoriaReceita.TipoCategoriaReceita;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var categoria = context.CategoriasReceitas.FirstOrDefault(x => x.Id == id);
            if (categoria == null)
                return false;
            categoria.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(CategoriaReceita categoriaReceita)
        {
            categoriaReceita.RegistroAtivo = true;
            context.CategoriasReceitas.Add(categoriaReceita);
            context.SaveChanges();
            return categoriaReceita.Id;
        }

        public CategoriaReceita ObterPeloId(int id)
        {
            var categoriaReceita = context.CategoriasReceitas.FirstOrDefault(x => x.Id == id);
            return categoriaReceita;
        }

        public List<CategoriaReceita> ObterTodos()
        {
            return context.CategoriasReceitas.Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();
        }
    }
}
