using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("tipo_categoria_despesas")]
    public class CategoriaDespesa
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Column("tipo_categoria_despesa")]
        public string TipoCategoriaDespesa { get; set; }
    }
}
