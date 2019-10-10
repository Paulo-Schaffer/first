using Model;
using Repository.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Repository.Repositories
{
    public class HistoricoRepository : IHistoricoRepository
    {
        private SistemaContext context;

        public HistoricoRepository()
        {
            context = new SistemaContext();
        }


        public bool Alterar(Historico historico)
        {
            var historicoOriginal = context.Historicos
                .FirstOrDefault(x => x.Id == historico.Id);
            if (historico == null)
            {
                return false;
            }
            historicoOriginal.Descricao = historico.Descricao;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var historico = context.Historicos.FirstOrDefault(x => x.Id == id);
            if (historico == null)
            {
                return false;
            }
            historico.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(Historico historico)
        {
            historico.RegistroAtivo = true;
            context.Historicos.Add(historico);
            context.SaveChanges();
            return historico.Id;
        }

        public Historico ObterPeloId(int id)
        {
            var historico = context.Historicos
                 .FirstOrDefault(x => x.Id == id);
            return historico;
        }

        public List<Historico> ObterTodos()
        {
            return context.Historicos
               .Where(x => x.RegistroAtivo == true)
               .OrderBy(x => x.Id)
               .ToList();
        }
    }
}
