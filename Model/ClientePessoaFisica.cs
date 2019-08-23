using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("clientes_pessoa_fisica")]
    public class ClientePessoaFisica
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

        [Column("cpf")]
        public string Cpf { get; set; }

        [Column("data_vencimento")]
        public DateTime DataVencimento { get; set; }

        [Column("limite_credito")]
        public decimal LimiteCredito { get; set; }

        [Column("emal")]
        public string Email { get; set; }

        [Column("telefone")]
        public int Telefone { get; set; }

        [Column("cep")]
        public string Cep { get; set; }

        [Column("numero")]
        public int Numero { get; set; }

        [Column("bairro")]
        public string Bairro { get; set; }

        [Column("cidade")]
        public string Cidade { get; set; }

        [Column("uf")]
        public string Uf { get; set; }

        [Column("complemento")]
        public string Complemento { get; set; }
    }
}
