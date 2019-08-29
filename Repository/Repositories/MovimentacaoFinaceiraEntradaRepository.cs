using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class MovimentacaoFinaceiraEntradaRepository : IMovimentacaoFinanceiraEntradaRepository
    {
        private SistemaContext context;

        public MovimentacaoFinaceiraEntradaRepository()
        {
            context = new SistemaContext();
        }
        public bool Alterar(MovimentacaoFinanceiraEntrada movimentacaoFinanceiraEntrada)
        {
            var movimentacaoFinanceiraEntradaOriginal = context.MovimentacaoFinanceiraEntradas.FirstOrDefault(x => x.Id == movimentacaoFinanceiraEntrada.Id);

            if(movimentacaoFinanceiraEntradaOriginal == null)
            {
                return false;
            }
            movimentacaoFinanceiraEntradaOriginal.IdContaCorrente = movimentacaoFinanceiraEntrada.IdContaCorrente;
            movimentacaoFinanceiraEntradaOriginal.IdCaixa = movimentacaoFinanceiraEntrada.IdCaixa;
            movimentacaoFinanceiraEntradaOriginal.IdParcelaReceber = movimentacaoFinanceiraEntrada.IdParcelaReceber;
            movimentacaoFinanceiraEntradaOriginal.Valor = movimentacaoFinanceiraEntrada.Valor;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public int Inserir(MovimentacaoFinanceiraEntrada movimentacaoFinanceiraEntrada)
        {
            throw new NotImplementedException();
        }

        public MovimentacaoFinanceiraEntrada ObterPeloId(int id)
        {
            throw new NotImplementedException();
        }

        public List<MovimentacaoFinanceiraEntrada> ObterTodos()
        {
            throw new NotImplementedException();
        }
    }
}
