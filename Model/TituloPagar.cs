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

        [Key,Column("id")]
        public int Id { get; set; }

        [Column("descricao")]
        public string Descricao { get; set; }

        [Column("forma_pagamento"), StringLength(45)]
        public string FormaPagamento { get; set; }

        [Column("caixa")]
        public bool Caixa { get; set; }

        [Column("valor")]
        public decimal Valor { get; set; }

        [Column("status"), StringLength(45)]
        public string Status { get; set; }

        [Column("data_lancamento")]
        public DateTime DataLancamento { get; set; }

        [Column("data_vencimento")]
        public DateTime DataVencimento { get; set; }

        [Column("data_pagamento")]
        public DateTime DataPagamento { get; set; }

        [Column("complemento")]
        public bool Complemento { get; set; }

        [Column("quantidade_parcela")]
        public int QuantidadeParcela { get; set; }

        #region FKFornecedor
        [Column("id_fornecedor")]
        public int IdFornecedor { get; set; }

        [ForeignKey("CadastroFornecedor")]
        public Fornecedor Fornecedor { get; set; }
        #endregion

        #region FKCategoriaDespesa
        [Column("id_despesa")]
        public int IdCategoriaDespesa { get; set; }

        [ForeignKey("CategoriaDespesa")]
        public CategoriaDespesas CategoriaDespesas { get; set; }
        #endregion
    }
}
