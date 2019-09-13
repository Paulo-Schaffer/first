using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("titulos_pagar")]
    public class TituloPagar
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Column("descricao")]
        public string Descricao { get; set; }

        [Column("forma_pagamento")]
        public string FormaPagamento { get; set; }

        [Column("caixa")]
        public bool Caixa { get; set; }

        [Column("valor_total")]
        public decimal ValorTotal { get; set; }

        [Column("status")]
        public string Status { get; set; }

        [Column("data_lancamento")]
        public DateTime DataLancamento { get; set; }

        [Column("data_recebimento")]
        public DateTime DataRecebimento { get; set; }

        [Column("data_vencimento")]
        public DateTime DataVencimento { get; set; }

        [Column("complemento")]
        public string Complemento { get; set; }

        [Column("quantidade_parcelas")]
        public int QuantidadeParcela { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }

        #region fk__fornecedores
        [Column("id_fornecedor")]
        public int? IdFornecedor { get; set; }

        [ForeignKey("IdFornecedor")]
        public Fornecedor Fornecedores { get; set; }
        #endregion

        #region fk_categoria_despesas
        [Column("id_categoria_despesa")]
        public int IdCategoriaDespesa { get; set; }

        [ForeignKey("IdCategoriaDespesa")]
        public CategoriaDespesa CategoriaDespesa { get; set; }
        #endregion
    }
}
