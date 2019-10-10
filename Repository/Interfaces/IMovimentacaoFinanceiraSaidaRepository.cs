using Model;
using System.Collections.Generic;

namespace Repository.Interfaces
{
    public interface IMovimentacaoFinanceiraSaidaRepository
    {
        int Inserir(MovimentacaoFinanceiraSaida movimentacaoFinanceiraSaida);

        bool Alterar(MovimentacaoFinanceiraSaida movimentacaoFinanceiraSaida);

        List<MovimentacaoFinanceiraSaida> ObterTodos();

        bool Apagar(int id);

        MovimentacaoFinanceiraSaida ObterPeloId(int id);
    }
}
