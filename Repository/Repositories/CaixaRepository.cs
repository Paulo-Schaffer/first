using Model;
using Model.Grafico;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
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

        public List<FluxoCaixa> ObterDadosSumarizados(DateTime dataInicial, DateTime dataFinal)
        {

            return context.Database
                .SqlQuery<FluxoCaixa>(@"
                    SELECT FORMAT(caixas.data_lancamento, 'yyyy-MM-dd') AS data,  SUM(valor) as valor
                    FROM caixas 
                    GROUP BY FORMAT(caixas.data_lancamento, 'yyyy-MM-dd')
                    ").ToList();
            /*
             * WHERE 
	YEAR(caixas.data_lancamento) >= 2019 AND
	MONTH(caixas.data_lancamento) >= 01 AND
	DAY(caixas.data_lancamento) >= 02 AND
	YEAR(caixas.data_lancamento) <= 2019 AND
	MONTH(caixas.data_lancamento) <= 01 AND
	DAY(caixas.data_lancamento) <= 12 */
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
            var caixa = context.Caixas
                .Where(x => x.Id == id).FirstOrDefault();
            return caixa;
        }

        public List<Caixa> ObterTodos()
        {
            return context.Caixas.Include("Historico").Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();
        }
        public List<Caixa> ObterTodosRelatorio(/*DateTime dataLancamento, */int idHistorico, string descricao, int valor)
        {
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
            //if(dataLancamento != null)
            //{
            //    query = query.Where(x => x.DataLancamento.Date == dataLancamento.Date);
            //}

            return query.ToList();
        }

        
    }
}

