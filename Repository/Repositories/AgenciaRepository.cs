using Model;
using Repository.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Repository.Repositories
{
   public class AgenciaRepository : IAgenciaRepository
    {
        private SistemaContext context;

        public AgenciaRepository()
        {
            context = new SistemaContext(); 
        }

        public bool Alterar(Agencia agencia)    
        {
            var agenciaOriginal = context.Agencias.FirstOrDefault(x => x.Id == agencia.Id);

            if (agenciaOriginal == null)
                return false;

            agenciaOriginal.Banco = agencia.Banco;
            agenciaOriginal.NomeAgencia = agencia.NomeAgencia;
            agenciaOriginal.NumeroAgencia = agencia.NumeroAgencia;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var agencia = context.Agencias.FirstOrDefault(x => x.Id == id);

            if (agencia == null)
            {
                return false;
            }

            agencia.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(Agencia agencia)
        {
            context.Agencias.Add(agencia);
            context.SaveChanges();
            return agencia.Id;              
        }

        public Agencia ObterPeloId(int id)
        {
            var agencia = context.Agencias.FirstOrDefault(x => x.Id == id);
            return agencia; 
        }

        public List<Agencia> ObterTodos()
        {
            return context.Agencias.Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList(); 
        }
    }
}
