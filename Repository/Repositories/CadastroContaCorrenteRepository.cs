using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class CadastroContaCorrenteRepository : ICadastroContaCorrenteRepository
    {
        public SistemaContext context;

        public CadastroContaCorrenteRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(CadastroContaCorrente cadastrocontacorrente)
        {
            var cadastroContaCorrenteOriginal = context.CadastroContaCorrentes.Where(x => x.Id == cadastrocontacorrente.Id).FirstOrDefault();
            if (cadastroContaCorrenteOriginal == null)
            {
                return false;
            }

            cadastroContaCorrenteOriginal.IdAgencia = cadastrocontacorrente.IdAgencia;
            cadastroContaCorrenteOriginal.NumeroConta = cadastrocontacorrente.NumeroConta;

            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var CadastroContaCorrente = context.CadastroContaCorrentes.FirstOrDefault(x => x.Id == id);
            if (CadastroContaCorrente == null)
            {
                return false;
            }
            CadastroContaCorrente.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(CadastroContaCorrente cadastrosContaCorrente)
        {
            cadastrosContaCorrente.RegistroAtivo = true;
            context.CadastroContaCorrentes.Add(cadastrosContaCorrente);
            context.SaveChanges();
            return cadastrosContaCorrente.Id;
        }

        public CadastroContaCorrente ObterPeloId(int id)
        {
            var cadastroContaCorrente = context.CadastroContaCorrentes
                .Where(x => x.Id == id).FirstOrDefault();
            return cadastroContaCorrente;
        }

        public List<CadastroContaCorrente> ObterTodos(int idAgencia)
        {
            var query = context
                .CadastroContaCorrentes
                .Where(x => x.RegistroAtivo);

            if(idAgencia != CadastroContaCorrente.FiltroSemAgencia)
            {
                query = query.Where(x => x.IdAgencia == idAgencia);
            }

            //if (!string.IsNullOrEmpty(numero))
            //{
            //    query = query.Where(x => x.NumeroConta = numero);
            //}

            return query.ToList();
        }
    }
}
