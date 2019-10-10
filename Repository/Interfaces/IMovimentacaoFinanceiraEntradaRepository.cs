using Model;
using System.Collections.Generic;

namespace Repository.Interfaces
{
    public interface IMovimentacaoFinanceiraEntradaRepository
    {
        int Inserir(MovimentacaoFinanceiraEntrada movimentacaoFinanceiraEntrada);

        bool Alterar(MovimentacaoFinanceiraEntrada movimentacaoFinanceiraEntrada);

        List<MovimentacaoFinanceiraEntrada> ObterTodos();

        bool Apagar(int id);

        MovimentacaoFinanceiraEntrada ObterPeloId(int id);
    }
}
