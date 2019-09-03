using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
