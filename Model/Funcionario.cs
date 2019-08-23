using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
   [Table("funcionarios")]
   public class Funcionario
    {
        [Key,Column("id")]
        public int Id { get; set; }

        [Column("nome_funcionario"),StringLength(45)]
        public string NomeFuncionario { get; set; }

        [Column("tipo_funcionario")]
        public int TipoFuncionario { get; set; }
    }
}
