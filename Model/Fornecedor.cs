using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("fornecedores")]
    public class Fornecedor : Endereco
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("razao_social")]
        public string RazaoSocial { get; set; }

        [Required]
        [Column("nome_fantasia")]
        public string NomeFantasia { get; set; }

        [Required]
        [Column("data_cadastro")]
        public DateTime DataCadastro { get; set; }

        [Required]
        [Column("cnpj")]
        public string Cnpj { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivos { get; set; }

    }
}
