using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface IParcelaPagarRepository
    {
        int Inserir(ParcelaPagar parcelaPagar);

        bool Alterar(ParcelaPagar parcelaPagar);

        List<ParcelaPagar> ObterTodos();

        bool Apagar(int id);

        ParcelaPagar ObterPeloId(int id); 
    }
}
