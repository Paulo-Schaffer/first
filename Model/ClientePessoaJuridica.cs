using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("clientes_pessoa_juridica")]
    public class ClientePessoaJuridica
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
        public string Cnpj { get; set; }

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
        public string Uf { get; set; }

        [Column("cidade")]
        public string Cidade { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }
    }
}
