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
        [Required]
        [Column("nome_funcionario")]
        public string NomeFuncionario { get; set; }
        [Required]
        [Column("tipo_funcionario")]
        public int TipoFuncionario { get; set; }
        [Required]
        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }

    }
}
