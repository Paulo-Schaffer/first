using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    class TituloPagarRepository : ITituloPagarRepository
    {
        public bool Alterar(TituloPagar tituloPagar)
        {
            throw new NotImplementedException();
        }

        public bool Apagar(int id)
        {
            throw new NotImplementedException();
        }

        public int Inserir(TituloPagar tituloPagar)
        {
            throw new NotImplementedException();
        }

        public TituloPagar ObterPeloId(int id)
        {
            throw new NotImplementedException();
        }

        public List<TituloPagar> ObterTodos(int id, string descricao, string forma_pagamento, bool caixa, decimal valor_total, string status, DateTime data_lancamento, DateTime data_pagamento, DateTime data_vencimento, bool complemento, int quantidade_parcela, int id_fornecedor, int id_categorias_despesas)
        {
            throw new NotImplementedException();
        }

        public List<TituloPagar> ObterTodosSelect2(string pesquisa)
        {
            throw new NotImplementedException();
        }
    }
}
