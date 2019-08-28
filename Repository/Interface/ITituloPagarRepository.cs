using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface ITituloPagarRepository
    {
        int Inserir(TituloPagar tituloPagar);

        bool Alterar(TituloPagar tituloPagar);

        List<TituloPagar> ObterTodos(
            int id,
            string descricao,
            string forma_pagamento,
            bool caixa,
            decimal valor_total,
            string status,
            DateTime data_lancamento,
            DateTime data_pagamento,
            DateTime data_vencimento,
            bool complemento,
            int quantidade_parcela,
            int id_fornecedor,
            int id_categorias_despesas
            );

        TituloPagar ObterPeloId(int id);

        bool Apagar(int id);

        List<TituloPagar> ObterTodosSelect2(string pesquisa);
    }
}
