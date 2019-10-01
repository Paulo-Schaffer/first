using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class ParcelaReceberRepository : IParcelaReceberRepository
    {
        private SistemaContext context;

        public ParcelaReceberRepository()
        {
            context = new SistemaContext();
        }

        public void GerarParcelas(int idTituloReceber)
        {
            var tituloReceber = context.TitulosPagar.FirstOrDefault(x => x.Id == idTituloReceber);

            var dataAtual = DateTime.Now.AddDays(30);

            decimal valorTotal = tituloReceber.ValorTotal;
            decimal valorParcela = valorTotal / tituloReceber.QuantidadeParcela;
            string texto = valorParcela.ToString();
            int posicaoPonto = texto.IndexOf(",");
            texto = texto.Substring(0, posicaoPonto) + "," + texto.Substring(posicaoPonto + 1, 2);
            valorParcela = Decimal.Parse(texto);

            decimal totalAcumulado = 0;

            for (int i = 0; i < tituloReceber.QuantidadeParcela; i++)
            {
                var dataVencimento = dataAtual.AddMonths(i);

                if (i + 1 >= tituloReceber.QuantidadeParcela)
                {
                    valorParcela = valorTotal - totalAcumulado;
                }

                var parcela = new ParcelaReceber();
                parcela.Valor = valorParcela;
                parcela.DataVencimento = dataVencimento;
                parcela.IdTituloReceber = idTituloReceber;
                parcela.RegistroAtivo = true;
                parcela.Status = ParcelaPagar.StatusPendente;
                context.ParcelasReceber.Add(parcela);

                totalAcumulado += valorParcela;
            }
            context.SaveChanges();
        }

        public bool Alterar(ParcelaReceber parcelasReceber)
        {
            var parcelasReceberOriginal = context.ParcelasReceber
                .FirstOrDefault(x => x.Id == parcelasReceber.Id);
            if (parcelasReceber == null)
                return false;

            parcelasReceberOriginal.DataRecebimento = parcelasReceber.DataRecebimento;
            parcelasReceberOriginal.Status = ParcelaPagar.StatusPago;
            int quantidadeAfetada = context.SaveChanges();

            parcelasReceber.Status = TituloPagar.StatusPagoParcialmente;

            // Pegar o titulo a pagar
            // Definir o status como StatusPagoParcialmente
            // Atualizar

            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public int Inserir(ParcelaPagar parcelaPagar)
        {
            throw new NotImplementedException();
        }

        public ParcelaReceber ObterPeloId(int id)
        {
            var parcela = context.ParcelasReceber.Where(x => x.Id == id).FirstOrDefault();
            return parcela;
        }

        public List<ParcelaReceber> ObterTodos(int idTituloReceber)
        {
            return context.ParcelasReceber
                .Where(x => x.RegistroAtivo && x.IdTituloReceber == idTituloReceber).ToList();
        }
    }
}
