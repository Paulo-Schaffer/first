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
        public string DataLancamento { get; set; }

        [Column("data_recebimento")]
        public string DataRecebimento { get; set; }

        [Column("data_vencimento")]
        public string DataVencimento { get; set; }

        [Column("complemento")]
        public string Complemento { get; set; }

        [Column("quantidade_parcela")]
        public int QuantidadeParcela { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }

        #region fk__fornecedor
        [Column("id_fornecedor")]
        public int IdFornecedor { get; set; }

        [ForeignKey("IdFornecedor")]
        public Fornecedor fornecedor { get; set; }
        #endregion

        #region fk_categoria_despesas
        [Column("id_categoria_despesas")]
        public int IdCategoriaDepesesas { get; set; }

        [ForeignKey("IdCategoriaDepesesas")]
        public CategoriaDespesa CategoriaDespesa { get; set; }
        #endregion
    }
}
