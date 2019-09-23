using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface ICadastroContaCorrenteRepository
    {
        int Inserir(CadastroContaCorrente cadastrosContaCorrente);

        bool Alterar(CadastroContaCorrente cadastrosContaCorrente);

        List<CadastroContaCorrente> ObterTodos(int idAgencia);

        CadastroContaCorrente ObterPeloId(int id);

        bool Apagar(int id);
    }
}
