using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface IContaCorrenteRepository
    {
        int Inserir(ContaCorrente contaCorrente);

        bool Alterar(ContaCorrente
            contaCorrente);

        List<ContaCorrente> ObterTodos();

        bool Apagar(int id);

        ContaCorrente ObterPeloid(int id); 
    }
}
