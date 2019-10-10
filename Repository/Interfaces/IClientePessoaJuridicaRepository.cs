using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IClientePessoaJuridicaRepository
    {
        int Inserir(ClientePessoaJuridica clientepessoajuridica);

        bool Alterar(ClientePessoaJuridica clientepessoajuridica);

        List<ClientePessoaJuridica> ObterTodos();

        bool Apagar(int id);

        ClientePessoaJuridica ObterPeloId(int id);
    }
}
