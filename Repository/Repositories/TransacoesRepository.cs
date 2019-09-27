using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class TransacoesRepository : ITransacoesRepository
    {
        private SistemaContext context; 
        
        public TransacoesRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(Transacao transacao)
        {
            var transacaoOriginal = context.Transacoes.FirstOrDefault(x => x.Id == transacao.Id);

            if (transacaoOriginal == null)
                return false;

            transacaoOriginal.IdCadastrosContaCorrente = transacao.IdCadastrosContaCorrente;
            transacaoOriginal.IdHistorico = transacao.IdHistorico;
            transacaoOriginal.IdCategoriaReceita = transacao.IdCategoriaReceita;
            transacaoOriginal.IdCategoriaDespesa = transacao.IdCategoriaDespesa;
            transacaoOriginal.DescricaoTransacao = transacao.DescricaoTransacao;
            transacaoOriginal.Documento = transacao.Documento;
            transacaoOriginal.TipoPagamento = transacao.TipoPagamento;
            transacaoOriginal.Valor = transacao.Valor;
            transacaoOriginal.DataLancamento = transacao.DataLancamento;
            transacaoOriginal.DataRecebimento = transacao.DataRecebimento;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;   

        }

        public bool Apagar(int id)
        {
            var transacao = context.Transacoes.FirstOrDefault(x => x.Id == id);

                if(transacao == null)
            {
                return false;
            }
            transacao.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1; 
        }

        public int Inserir(Transacao transacao)
        {
            context.Transacoes.Add(transacao);
            context.SaveChanges();
            return transacao.Id;
        }

        public Transacao ObterPeloId(int id)
        {
            var transacao = context.Transacoes.Include("CadastrosContaCorrente")
                .Include("Historico")
                .Include("CategoriaReceita")
                .Include("CategoriaDespesa").FirstOrDefault(x => x.Id == id);
            return transacao; 
        }

        public List<Transacao> ObterTodos()
        {
            return context.Transacoes
                .Include("CadastrosContaCorrente")
                .Include("Historico")
                .Include("CategoriaReceita")
                .Include("CategoriaDespesa")
                .Where(x => x.RegistroAtivo == true).ToList();
        }
    }
}
