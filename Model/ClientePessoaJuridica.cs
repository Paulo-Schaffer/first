using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("clientes_pessoa_juridica")]
    public class ClientePessoaJuridica
    {

        [Key, Column("id")]
        public int Id { get; set; }

        [Column("razao_social"), StringLength(100)] 
        public string RazaoSocial { get; set; }

        [Column("atividade"), StringLength(100)]
        public string Atividade { get; set; }

        [Column("nome_fantasia"), StringLength(100)]
        public string NomeFantasia { get; set; }

        [Column("data_cadastro")]
        public DateTime DataCadastro { get; set; }

        [Column("cnpj"), StringLength(18)]
        public string Cnpj { get; set; }

        [Column("email"), StringLength(50)]
        public string Email { get; set; }

        [Column("filial"), StringLength(100)]
        public string Filial { get; set; }

        [Column("telefone"), StringLength(100)]
        public string Telefone { get; set; }

        [Column("cep"), StringLength(9)]
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
