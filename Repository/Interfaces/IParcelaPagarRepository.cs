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
        void GerarParcelas(decimal valor, int quantidadesPacelas, int idTituloPagar);


        List<ParcelaPagar> ObterTodos();


        ParcelaPagar ObterPeloId(int id); 
    }
}
