using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
