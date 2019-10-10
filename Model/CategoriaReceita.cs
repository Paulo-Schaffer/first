using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("categoria_receita")]
    public class CategoriaReceita
    {
        [Key,Column("id")]
        public int Id { get; set; }

        [Column("tipo_categoria_receita")]
        public string TipoCategoriaReceita { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }
    }
}
