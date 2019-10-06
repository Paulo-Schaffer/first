using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface ITituloReceberRepository
    {
        int Inserir(TituloReceber tituloReceber);

        bool Alterar(TituloReceber tituloReceber);

        List<TituloReceber> ObterTodos();

        bool Apagar(int id);

        TituloReceber ObterPeloId(int id);

        List<TituloReceber> ObterTodosRelatorio(string dataInicial, string dataFinal, string descricao, int valorTotal, int idReceita);
    }
}