using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Endereco
    {
        [Column("email")]
        public string Email { get; set; }

        [Required]
        [Column("telefone")]
        public string Telefone { get; set; }

        [Required]
        [Column("cep")]
        public string Cep { get; set; }

        [Required]
        [Column("logradouro")]
        public string Logradouro { get; set; }

        [Required]
        [Column("numero")]
        public int Numero { get; set; }

        [Required]
        [Column("bairro")]
        public string Bairro { get; set; }

        [Required]
        [Column("cidade")]
        public string Cidade { get; set; }

        [Required]
        [Column("uf")]
        public string Uf { get; set; }

        [Required]
        [Column("complemento")]
        public string Complemento { get; set; }

        [Required]
        [Column("registroativo")]
        public bool RegistroAtivo { get; set; }

    }
}
