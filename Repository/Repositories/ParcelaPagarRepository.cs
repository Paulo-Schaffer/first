using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class ParcelaPagarRepository : IParcelaPagarRepository

    {
        public SistemaContext context;

        public void GerarParcelas(decimal valor, int quantidadesPacelas, int idTituloPagar)
        {
            context = new SistemaContext();
        }

        public void GerarParcelas(decimal valor, int quantidadesPacelas, int idTituloPagar)
        {
            var dataAtual = DateTime.Now.AddDays(30);

            for (int i = 0; i < quantidadesPacelas; i++)
            {
                var dataVencimento = dataAtual.AddMonths(i);

                var parcela = new ParcelaPagar();
                parcela.Valor = valor;
                parcela.DataVencimento = dataVencimento;
                parcela.IdTituloPagar = idTituloPagar;
                parcela.RegistroAtivo = true;
                context.ParcelasPagar.Add(parcela);
                context.SaveChanges();
            }


        }

        public ParcelaPagar ObterPeloId(int id)
        {
            var parcela = context.ParcelasPagar.Where(x => x.Id == id).FirstOrDefault();
            return parcela;
        }

        public List<ParcelaPagar> ObterTodos()
        {
            return context.ParcelasPagar.Where(x => x.RegistroAtivo == true).ToList();
        }
    }
}
