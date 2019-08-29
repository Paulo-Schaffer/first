using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                .Where(x => x.Id == historico.Id)
                .FirstOrDefault();
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
            context.SaveChanges();
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(Historico historico)
        {
            context.Historicos.Add(historico);
            context.SaveChanges();
            return historico.Id;
        }

        public Historico ObterPeloId(int id)
        {
            var historico = context.Historicos
                 .Where(x => x.Id == id)
                 .FirstOrDefault(x => x.Id == id);
            return historico;
        }

        public List<Historico> ObterTodos()
        {
            return context.Historicos
               .Where(x => x.RegistroAtivo == true)
               .OrderBy(x => x.Descricao)
               .ToList();
        }
    }
}
