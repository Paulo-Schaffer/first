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
        private SistemaContext context;

        public ParcelaPagarRepository()
        {
            context = new SistemaContext();
        }

        public void GerarParcelas(int idTituloPagar)
        {
            var tituloPagar = context.TitulosPagar.FirstOrDefault(x => x.Id == idTituloPagar);

            var dataAtual = DateTime.Now.AddDays(30);

            decimal valorTotal = tituloPagar.ValorTotal;
            decimal valorParcela = valorTotal / tituloPagar.QuantidadeParcela;
            string texto = valorParcela.ToString();
            int posicaoPonto = texto.IndexOf(",");
            texto = texto.Substring(0, posicaoPonto) + "," + texto.Substring(posicaoPonto + 1, 2);
            valorParcela = Decimal.Parse(texto);

            decimal totalAcumulado = 0;

            for (int i = 0; i < tituloPagar.QuantidadeParcela; i++)
            {
                var dataVencimento = dataAtual.AddMonths(i);

                if(i + 1 >= tituloPagar.QuantidadeParcela)
                {
                    valorParcela = valorTotal - totalAcumulado;
                }

                var parcela = new ParcelaPagar();
                parcela.Valor = valorParcela;
                parcela.DataVencimento = dataVencimento;
                parcela.IdTituloPagar = idTituloPagar;
                parcela.RegistroAtivo = true;
                context.ParcelasPagar.Add(parcela);

                totalAcumulado += valorParcela;
            }
            context.SaveChanges();
        }

        public bool Alterar(ParcelaPagar parcelaPagar)
        {
            throw new NotImplementedException();
        }

        public bool Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public int Inserir(ParcelaPagar parcelaPagar)
        {
            throw new NotImplementedException();
        }

        public ParcelaPagar ObterPeloId(int id)
        {
            var parcela = context.ParcelasPagar.Where(x => x.Id == id).FirstOrDefault();
            return parcela;
        }

        public List<ParcelaPagar> ObterTodos(int idTituloPagar)
        {
            return context.ParcelasPagar
                .Where(x => x.RegistroAtivo && x.IdTituloPagar == idTituloPagar).ToList();
        }
    }
}
