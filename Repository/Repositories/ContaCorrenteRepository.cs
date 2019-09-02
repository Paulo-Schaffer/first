using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    class ContaCorrenteRepository : IContaCorrenteRepository
    {
        private SistemaContext context; 
        
        public ContaCorrenteRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(ContaCorrente contaCorrente)
        {
            var contaCorrenteOriginal = context.ContasCorrentes.FirstOrDefault(x => x.Id == contaCorrente.Id);

            if (contaCorrenteOriginal == null)
                return false;

            contaCorrenteOriginal.NumeroConta = contaCorrente.NumeroConta;
            contaCorrenteOriginal.Descricao = contaCorrente.Descricao;
            contaCorrenteOriginal.Documento = contaCorrente.Documento;
            contaCorrenteOriginal.TipoReceitaDespesa = contaCorrente.TipoReceitaDespesa;
            contaCorrenteOriginal.TipoPagamento = contaCorrente.TipoPagamento;
            contaCorrenteOriginal.Valor = contaCorrente.Valor;
            contaCorrente.Status = contaCorrente.Status;
            contaCorrenteOriginal.DataLancamento = contaCorrente.DataLancamento;
            contaCorrenteOriginal.DataVencimento = contaCorrente.DataVencimento;
            contaCorrenteOriginal.DataRecebimento = contaCorrente.DataRecebimento;
            contaCorrenteOriginal.NomeBanco = contaCorrente.NomeBanco;
            contaCorrenteOriginal.NumeroBanco = contaCorrente.NumeroBanco;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;   

        }

        public bool Apagar(int id)
        {
            var contaCorrente = context.ContasCorrentes.FirstOrDefault(x => x.Id == id);

                if(contaCorrente==null)
            {
                return false;
            }
            contaCorrente.RegistroAtivo = true;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1; 
        }

        public int Inserir(ContaCorrente contaCorrente)
        {
            context.ContasCorrentes.Add(contaCorrente);
            context.SaveChanges();
            return contaCorrente.Id;
        }

        public ContaCorrente ObterPeloid(int id)
        {
            var contaCorrente = context.ContasCorrentes.FirstOrDefault(x => x.Id == id);
            return contaCorrente; 
        }

        public List<ContaCorrente> ObterTodos()
        {
            return context.ContasCorrentes.Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList(); 
        }
    }
}
