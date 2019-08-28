using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("agencias")]
    public class Agencia
    {
        [Key,Column("id")]
        public int Id { get; set; }


        [Column("id_banco")]
        public int  IdBanco { get; set; }


        [Column("nome_agencia"), StringLength(50)]
        public string NomeAgencia { get; set; }


        [Column("numero_agencia"), StringLength(50)]
        public string NumeroAgencia { get; set; }


    }
}
