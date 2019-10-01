using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface ICaixaRepository 
    {

        bool Alterar(Caixa caixa);

        bool Apagar(int id);

        int Inserir(Caixa caixa);

        List<Caixa> ObterTodos();

        List<Caixa> ObterTodosRelatorio(/*DateTime dataLancamento,*/ int idHistorico, string descricao, int valor);


        Caixa ObterPeloId(int id);

    }
}
