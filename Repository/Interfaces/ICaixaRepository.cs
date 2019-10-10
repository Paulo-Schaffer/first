using Model;
using System;
using System.Collections.Generic;

namespace Repository.Interfaces
{
    public interface ICaixaRepository 
    {
        int Inserir(Caixa caixa);

        bool Alterar(Caixa caixa);

        List<Caixa> ObterTodos();

        bool Apagar(int id);

        Caixa ObterPeloId(int id);

        List<Caixa> ObterTodosRelatorio(string dataInicial, string dataFinal, int idHistorico, string descricao, int valor);

        List<FluxoCaixa> ObterDadosSumarizados(DateTime dataInicial, DateTime dataFinal);
    }
}
