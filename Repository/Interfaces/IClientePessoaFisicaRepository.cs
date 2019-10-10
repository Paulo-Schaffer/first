using Model;
using System.Collections.Generic;

namespace Repository.Interfaces
{
    public interface IClientePessoaFisicaRepository
    {
        int Inserir(ClientePessoaFisica clientePessoaFisica);

        bool Alterar(ClientePessoaFisica clientePessoaFisica);

        List<ClientePessoaFisica> ObterTodos();

        bool Apagar(int id);

        ClientePessoaFisica ObterPeloId(int id);
    }
}
