using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("historico")]
   public  class Historico
    {
        [Key,Column("id")]
        public int Id { get; set; }
        [Column("descricao  ")]
        public string Descricao { get; set; }
    }
}
