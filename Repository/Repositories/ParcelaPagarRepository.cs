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

        public bool Alterar(ParcelaPagar parcelaPagar)
        {
            var parcelaPagarOriginal = context.ParcelasPagar.FirstOrDefault(x => x.Id == parcelaPagar.Id);

            if (parcelaPagarOriginal == null)
                return false;

            parcelaPagarOriginal.Valor = parcelaPagar.Valor;
            parcelaPagarOriginal.Status = parcelaPagar.Status;
            parcelaPagarOriginal.DataVencimento = parcelaPagar.DataVencimento;
            parcelaPagarOriginal.DataPagamento =parcelaPagar.DataPagamento;
            int quantidadeAfetada = context.SaveChanges();  
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var parcelaPagar = context.ParcelasPagar.FirstOrDefault(x => x.Id == id);

                if(i + 1 >= tituloPagar.QuantidadeParcela)
                {
                    valorParcela = valorTotal - totalAcumulado;
                }

                var parcela = new ParcelaPagar();
                parcela.Valor = valorParcela;
                parcela.DataVencimento = dataVencimento;
                parcela.IdTituloPagar = idTituloPagar;
                parcela.RegistroAtivo = true;
                parcela.Status = ParcelaPagar.StatusPendente;
                context.ParcelasPagar.Add(parcela);

                totalAcumulado += valorParcela;
            }

        public bool Alterar(ParcelaPagar parcelaPagar)
        {
            var parcelasPagarOriginal = context.ParcelasPagar
                .FirstOrDefault(x => x.Id == parcelaPagar.Id);
            if (parcelaPagar == null)
                return false;

            parcelasPagarOriginal.DataPagamento = parcelaPagar.DataPagamento;
            parcelasPagarOriginal.Status = ParcelaPagar.StatusPago;
            int quantidadeAfetada = context.SaveChanges();

            parcelaPagar.Status = TituloPagar.StatusPagoParcialmente;

            // Pegar o titulo a pagar
            // Definir o status como StatusPagoParcialmente
            // Atualizar

            return quantidadeAfetada == 1;
        }

            parcelaPagar.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(ParcelaPagar parcelaPagar)
        {
            throw new NotImplementedException();
        }

        public ParcelaPagar ObterPeloId(int id)
        {
            var parcelaPagar = context.ParcelasPagar.FirstOrDefault(x => x.Id == id);
            return parcelaPagar;

        }

        public List<ParcelaPagar> ObterTodos()
        {
            return context.ParcelasPagar.Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();

        }
    }
}
