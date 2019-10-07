using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface ITituloPagarRepository
    {
        int Inserir(TituloPagar tituloPagar);

        bool Alterar(TituloPagar tituloPagar);

        List<TituloPagar> ObterTodos();

        TituloPagar ObterPeloId(int id);

        bool Apagar(int id);

        List<TituloPagar> ObterTodosRelatorio(string dataInicial, string dataFinal, string descricao, int valorTotal, int idDespesa);

        List<GraficoTitulo> ObterDadosSumarizados(DateTime dataInicial, DateTime dataFinal);
    }
}
