using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("cadastroscontacorrente")]
    public class CadastroContaCorrente
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Column("numero_conta")]
        public int NumeroConta { get; set; }

        [Column("id_agencia")]
        public int IdAgencia { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }

        [ForeignKey("IdAgencia")]
        public Agencia Agencia { get; set; }
    }
}
