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
        public void GerarParcelas(decimal valor, int quantidadesPacelas, int idTituloReceber)
   public class ParcelaReceberRepository : IParcelaReceberRepository
   {
        private SistemaContext context;

        public ParcelaReceberRepository()
        {
            context = new SistemaContext();
        }

        public void GerarParcelas( int idTituloReceber)
        {
            var tituloReceber = context.TitulosReceber.FirstOrDefault(x => x.Id == idTituloReceber);
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
                parcela.Status = TituloReceber.StatusPendente;
                context.ParcelasReceber.Add(parcela);
                totalAcumulado += valorParcela;
            }
            context.SaveChanges();
        }

        public ParcelaReceber ObterPeloId(int id)
        {
            throw new NotImplementedException();
        }

        public List<ParcelaReceber> ObterTodos(int idTituloReceber)
        {
            return context.ParcelasReceber
                .Where(x => x.RegistroAtivo && x.IdTituloReceber == idTituloReceber).ToList();
        }

       public bool Alterar(ParcelaReceber parcelaReceber)
        {
            var parcelaReceberOriginal = context.ParcelasReceber.FirstOrDefault(x => x.Id == parcelaReceber.Id);
            if (parcelaReceber == null)
            {
                return false;
            }
            parcelaReceberOriginal.DataRecebimento = parcelaReceber.DataRecebimento;
            parcelaReceberOriginal.Status = ParcelaReceber.StatusPago;
            int quantidadeAfeada = context.SaveChanges();

            return quantidadeAfeada == 1;
        }
        public bool Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public int Inserir(ParcelaReceber parcelaReceber)
        {
            throw new NotImplementedException();
        }
    }
}
