using Model;
using System.Collections.Generic;

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