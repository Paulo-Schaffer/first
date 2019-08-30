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
            var movimentacaoFinaceiraEntrada = context.MovimentacaoFinanceiraEntradas.FirstOrDefault(x => x.Id == id);
            if (movimentacaoFinaceiraEntrada == null)
            {
                return false;
            }

            movimentacaoFinaceiraEntrada.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();

            return quantidadeAfetada == 1;

        }

        public int Inserir(MovimentacaoFinanceiraEntrada movimentacaoFinanceiraEntrada)
        {
            context.MovimentacaoFinanceiraEntradas.Add(movimentacaoFinanceiraEntrada);
            context.SaveChanges();
            return movimentacaoFinanceiraEntrada.Id;
        }

        public MovimentacaoFinanceiraEntrada ObterPeloId(int id)
        {
            var movimentacaoFinaceiraEntrda = context.MovimentacaoFinanceiraEntradas.FirstOrDefault(x => x.Id == id);
            return movimentacaoFinaceiraEntrda;
        }

        public List<MovimentacaoFinanceiraEntrada> ObterTodos()
        {
            return context.MovimentacaoFinanceiraEntradas.Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();
        }
    }
}
