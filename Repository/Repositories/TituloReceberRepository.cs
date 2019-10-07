using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class TituloReceberRepository : ITituloReceberRepository
    {
        private SistemaContext context;

        public TituloReceberRepository()
        {

            context = new SistemaContext();
        }

        public bool Alterar(TituloReceber tituloReceber)    
        {
            var tituloReceberOriginal = context.TitulosReceber.Where(x => x.Id == tituloReceber.Id).FirstOrDefault();

            if (tituloReceberOriginal == null)
                return false;

            tituloReceberOriginal.IdClientePessoaJuridica = tituloReceber.IdClientePessoaJuridica;
            tituloReceberOriginal.IdClientePessoaFisica = tituloReceber.IdClientePessoaFisica;
            tituloReceberOriginal.IdCategoriaReceita = tituloReceber.IdCategoriaReceita;
            tituloReceberOriginal.Descricao = tituloReceber.Descricao;
            tituloReceberOriginal.Status = tituloReceber.Status;
            tituloReceberOriginal.DataLancamento = tituloReceber.DataLancamento;
            tituloReceberOriginal.DataRecebimento = tituloReceber.DataRecebimento;
            tituloReceberOriginal.DataVencimento = tituloReceber.DataVencimento;
            tituloReceberOriginal.QuantidadeParcela = tituloReceber.QuantidadeParcela;

            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var tituloReceber = context.TitulosReceber.FirstOrDefault(x => x.Id == id);
            if (tituloReceber == null)
            {
                return false;
            }
            tituloReceber.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;

        }

        public int Inserir(TituloReceber tituloReceber)
        {
            // tituloReceber.RegistroAtivo = true; 
            context.TitulosReceber.Add(tituloReceber);
            context.SaveChanges();
            return tituloReceber.Id;
        }

        public TituloReceber ObterPeloId(int id)
        {
            var tituloReceber = context.TitulosReceber
                .Where(x => x.Id == id).FirstOrDefault();
            return tituloReceber;
        }

        public List<TituloReceber> ObterTodos()
        {
            return context.TitulosReceber
                .Include("ClientePessoaJuridica")
                .Include("ClientePessoaFisica")
                .Include("CategoriaReceita")
                .Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();

        }
        public List<TituloReceber> ObterTodosRelatorio(string dataInicial, string dataFinal,string descricao, int valorTotal, int idReceita)
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
                .TitulosReceber
                .Include("CategoriaReceita")
                .Where(x => x.RegistroAtivo);

            if (idReceita != TituloReceber.FiltroSemReceita)
            {
                query = query.Where(x => x.IdCategoriaReceita == idReceita );
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

            return query
                .ToList();
        }



        public List<GraficoTitulo> ObterDadosSumarizados(DateTime dataInicial, DateTime dataFinal)
        {
            return context.Database
                .SqlQuery<GraficoTitulo>(@"
                    SELECT FORMAT(titulos_receber.data_lancamento, 'yyyy-MM-dd') AS data,  SUM(valor_total) as valor
                    FROM titulos_receber 
                    GROUP BY FORMAT(titulos_receber.data_lancamento, 'yyyy-MM-dd')
                    ").ToList();
        }
    }
}