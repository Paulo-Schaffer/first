using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("titulos_receber")]
    public class TituloReceber
    {
        public int Id { get; set; }

        public string Descricao { get; set; }

        public bool Caixa { get; set; }

        public decimal ValorTotal { get; set; }
    }
}
