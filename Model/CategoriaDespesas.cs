using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class CategoriaDespesas
    {
        [Table("categorias_despesas")]
        public class CatgoriasDespesas
        {
            [Key, Column("id")]
            public int Id { get; set; }

            [Column("tipo_despesa")]
            public string TipoDespesa { get; set; }
        }
    }
}
