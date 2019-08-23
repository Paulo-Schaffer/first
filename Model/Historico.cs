using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{


    [Table("historicos")]

    class Historico
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Column("descricao"),StringLength(100)]
        public string Descricao { get; set; }
            
    }
}
