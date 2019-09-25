using Model;
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

            caixaRegistro.Descricao = caixa.Descricao;
            caixaRegistro.Documento = caixa.Documento;
            caixaRegistro.FormaPagamento = caixa.FormaPagamento;
            caixaRegistro.Valor = caixa.Valor;
            caixaRegistro.DataLancamento = caixa.DataLancamento;
            caixaRegistro.Status = caixa.Status;
            caixaRegistro.Historico = caixa.Historico;
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
            return context.Caixas.Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();
        }
    }
}

