using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class MovimentacaoFinanceiraSaidaRepository : IMovimentacaoFinanceiraSaidaRepository
    {
        private SistemaContext context;

        public MovimentacaoFinanceiraSaidaRepository()
        {
            context = new SistemaContext();
        }
        public bool Alterar(MovimentacaoFinanceiraSaida movimentacaoFinanceiraSaida)
        {
            var movimentacaoRegistro = context.MovimentacaoFinanceiraSaidas.FirstOrDefault(x => x.Id == movimentacaoFinanceiraSaida.Id);
            if (movimentacaoRegistro == null)
                return false;
            movimentacaoRegistro.IdCaixa = movimentacaoFinanceiraSaida.IdCaixa;
            movimentacaoRegistro.IDContaCorrente = movimentacaoFinanceiraSaida.IDContaCorrente;
            movimentacaoRegistro.IdParcelaPagar = movimentacaoFinanceiraSaida.IdParcelaPagar;
            movimentacaoRegistro.Valor = movimentacaoFinanceiraSaida.Valor;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var movimentacao = context.MovimentacaoFinanceiraSaidas.FirstOrDefault(x => x.Id == id);
            if (movimentacao == null)
                return false;
            movimentacao.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(MovimentacaoFinanceiraSaida movimentacaoFinanceiraSaida)
        {
            movimentacaoFinanceiraSaida.RegistroAtivo = true;
            context.MovimentacaoFinanceiraSaidas.Add(movimentacaoFinanceiraSaida);
            context.SaveChanges();
            return movimentacaoFinanceiraSaida.Id
        }

        public MovimentacaoFinanceiraSaida ObterPeloId(int id)
        {
            throw new NotImplementedException();
        }

        public List<MovimentacaoFinanceiraSaida> ObterTodos()
        {
            return context.MovimentacaoFinanceiraSaidas.Where(x => x.RegistroAtivo).ToList();
        }
    }
}
