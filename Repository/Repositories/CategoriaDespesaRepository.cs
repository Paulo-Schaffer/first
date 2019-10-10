using Model;
using Repository.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Repository.Repositories
{
    public class CategoriaDespesaRepository : ICategoriaDespesaRepository
    {
        private SistemaContext context;

        public CategoriaDespesaRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(CategoriaDespesa categoriaDespesa)
        {
            var categoriaRegistro = context.CategoriasDespesas.FirstOrDefault(x => x.Id == categoriaDespesa.Id);
            if (categoriaDespesa == null)
                return false;
            categoriaRegistro.TipoCategoriaDespesa = categoriaDespesa.TipoCategoriaDespesa;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var categoria = context.CategoriasDespesas.FirstOrDefault(x => x.Id == id);
            if (categoria == null)
                return false;
            categoria.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(CategoriaDespesa categoriaDespesa)
        {
            context.CategoriasDespesas.Add(categoriaDespesa);
            context.SaveChanges();
            return categoriaDespesa.Id;
        }

        public CategoriaDespesa ObterPeloId(int id)
        {
            var categoria = context.CategoriasDespesas.FirstOrDefault(x => x.Id == id);
            return categoria;
        }

        public List<CategoriaDespesa> ObterTodos()
        {
            return context.CategoriasDespesas.Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();
        }
    }
}
