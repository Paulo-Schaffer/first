using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IAgenciaRepository
    {
        int Inserir(Agencia agencia);


        bool Alterar(Agencia agencia);


        List<Agencia> ObterTodos();

        bool Apagar(int id);

        Agencia ObterPeloId(int id);
    }
}
