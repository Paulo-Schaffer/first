using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class CaixaRepository : ICaixaRepository
    {
        private SistemaContext context;

        public CaixaRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(Caixa caixa)
        {
            var caixaRegistro = context.Caixas.FirstOrDefault(x => x.Id == caixa.Id);

            if (caixaRegistro == null)
                return false;
            caixaRegistro.IdHistoricos = caixa.IdHistoricos;
            caixaRegistro.Operacao = caixa.Operacao;
            caixaRegistro.Descricao = caixa.Descricao;
            caixaRegistro.Documento = caixa.Documento;
            caixaRegistro.FormaPagamento = caixa.FormaPagamento;
            caixaRegistro.Valor = caixa.Valor;
            caixaRegistro.DataLancamento = caixa.DataLancamento;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var caixa = context.Caixas.FirstOrDefault(x => x.Id == id);
            if (caixa == null)
                return false;
            caixa.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(Caixa caixa)
        {
            context.Caixas.Add(caixa);
            context.SaveChanges();
            return caixa.Id;
        }

        public Caixa ObterPeloId(int id)
        {
            var caixa = context.Caixas.FirstOrDefault(x => x.Id == id);
            return caixa;
        }

        public List<Caixa> ObterTodos()
        {
            return context.Caixas.Include("Historico").Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();
        }
        public List<Caixa> ObterTodosRelatorio(string dataInicial, string dataFinal, int idHistorico, string descricao, int valor)
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
                .Caixas
                .Where(x => x.RegistroAtivo);

            if (idHistorico != Caixa.FiltroSemHistorico)
            {
                query = query.Where(x => x.IdHistoricos == idHistorico);
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
                //query = query.Where(x => x.DataLancamento.Date == dataInicial.Date);
                //query = query.Where(x => x.DataLancamento.Date == dataFinal.Date);


            }
            if (valor != 0)
            {
                query = query.Where(x => x.Valor == valor);
            }

            return query.ToList();
        }
        public List<FluxoCaixa> ObterDadosSumarizados(DateTime dataInicial, DateTime dataFinal)
        {

            return context.Database
                .SqlQuery<FluxoCaixa>(@"
                    SELECT FORMAT(caixas.data_lancamento, 'yyyy-MM-dd') AS data,  SUM(valor) as valor
                    FROM caixas 
                    GROUP BY FORMAT(caixas.data_lancamento, 'yyyy-MM-dd')
                    ").ToList();

        }
    }

}

