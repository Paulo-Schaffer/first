using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("categoriaDespesa")]
    public class CategoriaDespesa
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Column("tipo_categoria_despesa")]
        public string TipoCategoriaDespesa { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }
    }
}
