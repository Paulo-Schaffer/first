using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("historico")]
    public class Historico
    {
        [Key, Column("id")]
        public int Id { get; set; }
        [Column("descricao  ")]
        public string Descricao { get; set; }
        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }
    }
}
