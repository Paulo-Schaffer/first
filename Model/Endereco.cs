using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    public class Endereco
    {
        [Required]
        [Column("email")]
        public string Email { get; set; }

        [Required]
        [Column("telefone")]
        public string Telefone { get; set; }

        [Required]
        [Column("cep")]
        public string Cep { get; set; }

        [Column("logradouro")]
        public string Logradouro { get; set; }

        [Column("numero")]
        public int? Numero { get; set; }

        [Column("bairro")]
        public string Bairro { get; set; }

        [Column("cidade")]
        public string Cidade { get; set; }

        [Column("uf")]
        public string Uf { get; set; }

        [Column("complemento")]
        public string Complemento { get; set; }

        [Column("registroativo")]
        public bool RegistroAtivo { get; set; }
    }
}
