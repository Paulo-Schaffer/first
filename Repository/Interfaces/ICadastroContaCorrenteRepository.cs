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

        bool Apagar(int id);

        List<CadastroContaCorrente> ObterTodos(string busca);

        CadastroContaCorrente ObterPeloId(int id);
    }
}
