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
        [Column("razao_social")]
        public string RazaoSocial { get; set; }
        [Column("atividade")]
        public string Atividade { get; set; }
        [Column("nome_fantasia")]
        public string NomeFantasia { get; set; }
        [Column("data_cadastro")]
        public DateTime DataCadastro { get; set; }
        [Column("cnpj")]
        public string CNPJ { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("filial")]
        public string Filial { get; set; }
        [Column("telefone")]
        public string Telefone { get; set; }
        [Column("cep")]
        public string Cep { get; set; }
        [Column("logradouro")]
        public string Logradouro { get; set; }
        [Column("numero")]
        public int Numero { get; set; }
        [Column("bairro")]
        public string Bairro { get; set; }
        [Column("uf")]
        public string UF { get; set; }
        [Column("cidade")]
        public string Cidade { get; set; }

    }
}
