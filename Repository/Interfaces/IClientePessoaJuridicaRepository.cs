using Model;
using System.Collections.Generic;

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
