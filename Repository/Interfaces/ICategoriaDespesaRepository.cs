using Model;
using System.Collections.Generic;

namespace Repository.Interfaces
{
    public interface ICategoriaDespesaRepository
    {
        int Inserir(CategoriaDespesa categoriaDespesa);

        bool Alterar(CategoriaDespesa categoriaDespesa);

        List<CategoriaDespesa> ObterTodos();

        bool Apagar(int id);

        CategoriaDespesa ObterPeloId(int id);
    }
}
