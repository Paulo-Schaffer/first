using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
