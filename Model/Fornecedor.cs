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
    public class Fornecedor
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Column("razoes_sociais"), StringLength(100)]
        public string RazaoSocial { get; set; }

        [Column("atividades"),StringLength(100)]
        public string Atividade { get; set; }

        [Column("nomes_fantasia"),StringLength(100)]
        public string NomeFantasia { get; set; }

        [Column("data_cadastro")]
        public DateTime DataCadastro { get; set; }

        [Column("cnpj"), StringLength(18)]
        public string Cnpj { get; set; }

        [Column("email"), StringLength(100)]
        public string Email { get; set; }

        [Column("telefone"), StringLength(20)]
        public string Telefone { get; set; }

        [Column("cep"), StringLength(10)]
        public string Cep { get; set; }

        [Column("logradouro"), StringLength(100)]
        public string Logradouro { get; set; }

        [Column("numero")]
        public int Numero { get; set; }

        [Column("bairro"), StringLength(100)]
        public string Bairro { get; set; }

        [Column("uf"), StringLength(2)]
        public string Uf { get; set; }

        [Column("cidade"), StringLength(100)]
        public string Cidade { get; set; }

    }
}
