﻿using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface ICaixaRepository 
    {
        int Inserir(Caixa caixa);

        bool Alterar(Caixa caixa);

        List<Caixa> ObterTodos();

        bool Apagar(int id);

        Caixa ObterPeloId(int id);

        List<Caixa> ObterTodosRelatorio(DateTime dataLancamentoInicial, DateTime dataLancamentoFinal, int idHistorico, string descricao, int valor);

        List<FluxoCaixa> ObterDadosSumarizados(DateTime dataInicial, DateTime dataFinal);

    }
}
