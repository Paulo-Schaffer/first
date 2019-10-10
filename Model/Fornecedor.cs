using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
