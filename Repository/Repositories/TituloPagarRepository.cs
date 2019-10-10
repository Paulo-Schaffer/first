using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Repository.Repositories
{
   public class TituloPagarRepository : ITituloPagarRepository
    {
        public SistemaContext context;

        public TituloPagarRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(TituloPagar tituloPagar)
        {
            var tituloPagarOficial = context.TitulosPagar.Where(x => x.Id == tituloPagar.Id).FirstOrDefault();
            if (tituloPagarOficial == null)
                return false;

            tituloPagarOficial.IdFornecedor = tituloPagar.IdFornecedor;
            tituloPagarOficial.IdCategoriaDespesa = tituloPagar.IdCategoriaDespesa;
            tituloPagarOficial.Descricao = tituloPagar.Descricao;
            tituloPagarOficial.FormaPagamento = tituloPagar.FormaPagamento;
            tituloPagarOficial.Caixa = tituloPagar.Caixa;
            tituloPagarOficial.Status = tituloPagar.Status;
            tituloPagarOficial.DataLancamento = tituloPagar.DataLancamento;
            tituloPagarOficial.DataVencimento = tituloPagar.DataVencimento;
            tituloPagarOficial.QuantidadeParcela = tituloPagar.QuantidadeParcela;

            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var tituloPagar = context.TitulosPagar.FirstOrDefault(x => x.Id == id);
            if (tituloPagar == null)
            {
                return false;
            }

            tituloPagar.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(TituloPagar tituloPagar) 
        {
            context.TitulosPagar.Add(tituloPagar);
            context.SaveChanges();
            return tituloPagar.Id;
        }

        public TituloPagar ObterPeloId(int id)
        {
            var tituloPagar = context.TitulosPagar
                .Where(x => x.Id == id).FirstOrDefault();
            return tituloPagar;
        }

        public List<TituloPagar> ObterTodos()
        {
            return context.TitulosPagar
                .Include("Fornecedor")
                .Include("CategoriaDespesa")
                .Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();
        }

        public List<TituloPagar> ObterTodosRelatorio(string dataInicial, string dataFinal, string descricao, int valorTotal, int idDespesa)
        {
            if (dataInicial == "")
            {
                dataInicial = null;
            }
            if (dataFinal == "")
            {
                dataFinal = null;
            }
            var query = context
                .TitulosPagar
                .Include("Fornecedor")
                .Include("CategoriaDespesa")
                .Where(x => x.RegistroAtivo);

            if (idDespesa != TituloPagar.FiltroSemDespesa)
            {
                query = query.Where(x => x.IdCategoriaDespesa == idDespesa);
            }
            if (!string.IsNullOrEmpty(descricao))
            {
                query = query.Where(x => x.Descricao.Contains(descricao));
            }
            if ((dataInicial != null) && (dataFinal != null))
            {
                DateTime dataInicialConvertida = Convert.ToDateTime(dataInicial);
                DateTime dataFinalConvertida = Convert.ToDateTime(dataFinal);
                query = query.Where(x => x.DataLancamento == dataInicialConvertida || x.DataLancamento <= dataFinalConvertida);
            }
            if (valorTotal != 0)
            {
                query = query.Where(x => x.ValorTotal == valorTotal);
            }

            return query.ToList();
        }

        public List<GraficoTitulo> ObterDadosSumarizados(DateTime dataInicial, DateTime dataFinal)
        {
            return context.Database
                .SqlQuery<GraficoTitulo>(@"
                    SELECT FORMAT(titulos_pagar.data_lancamento, 'yyyy-MM-dd') AS data,  SUM(valor_total) as valor
                    FROM titulos_pagar 
                    GROUP BY FORMAT(titulos_pagar.data_lancamento, 'yyyy-MM-dd')
                    ").ToList();
        }
    }
}
