using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("titulos_receber")]
    public class TituloReceber
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Column("decricao")]
        public string Descricao { get; set; }

        [Column("valor_total"), MaxLength(15)]
        public decimal ValorTotal { get; set; }

        [Column ("status"), StringLength(45)]
        public string Status { get; set; }

        [Column("data_lancamento")]
        public DateTime DataDeLancamento { get; set; }

        [Column("data_recebimento")]
        public DateTime DataDeRecebimento { get; set; }

        [Column("data_vencimento")]
        public DateTime DataVencimento { get; set; }

        [Column("complemento")]
        public Boolean Complemento { get; set; }

        [Column("quantidade_parcelas")]
        public int QuantidadeParcelas { get; set; }


        #region fk_pessoa_juridica
        [Column("id_cliente_pessoa_juridica")]
        public int IdClientePessoaJuridica { get; set; }

        [ForeignKey("IdClientePessoaJuridica")]
        public ClientePessoaJuridica ClientePessoaJuridica { get; set; }
        #endregion

        #region fk_pessoa_fisica
        [Column("id_cliente_pessoa_fisica")]
        public int IdClientePessoaFisica { get; set; }

        [ForeignKey("IdClientePessoaJuridica")]
        public ClientePessoaJuridica ClientePessoaFisica { get; set; }
        #endregion

        #region fk_categoria_receita
        [Column("id_categoria_receita")]
        public int CategoriaReceita { get; set; }

        [ForeignKey("IdCategoriaCliente")]
        public CategoriaReceita CategoriaCliente{ get; set; }
        #endregion

    }

}

