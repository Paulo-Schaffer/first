using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("clientes_pessoa_fisica")]
    public class ClientePessoaFisica
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

        [Column("cpf"), StringLength(14)]
        public string Cpf { get; set; }

        [Column("data_nascimento")]
        public DateTime DataNascimento { get; set; }

        [Column("limite_credito")]
        public decimal LimiteCredito { get; set; }

        [Column("email"), StringLength(60)]
        public string Email { get; set; }

        [Column("telefone")]
        public string Telefone { get; set; }

        [Column("cep"), StringLength(9)]
        public string Cep { get; set; }

        [Column("numero")]
        public int Numero { get; set; }

        [Column("bairro"), StringLength(50)]
        public string Bairro { get; set; }

        [Column("cidade"), StringLength(50)]
        public string Cidade { get; set; }

        [Column("uf"), StringLength(2)]
        public string Uf { get; set; }

        [Column("complemento"), StringLength(50)]
        public string Complemento { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }
    }
}
