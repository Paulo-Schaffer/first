using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface ITransacoes
    {
        int Inserir(Transacao transacao);

        bool Alterar(Transacao
            contaCorrente);

        List<Transacao> ObterTodos();

        bool Apagar(int id);

        Transacao ObterPeloId(int id);

        List<Transacao> ObterTodosRelatorio(int idReceita, int IdDespesa, string documento);
    }
}
