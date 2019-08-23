using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("categorias_receita")]
    public class CategoriaReceita
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Column("tipo_receita"), StringLength(45)]
        public string TipoReceita { get; set; }
    }
}
