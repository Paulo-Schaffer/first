using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
