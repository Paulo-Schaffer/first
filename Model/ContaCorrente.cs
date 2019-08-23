using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("conta_corrente")]
    public class ContaCorrente
    {

        [Key,Column("id")]
        public int Id { get; set; }

        [Column("nuemero_conta")StringLength(30)]
        public string NumeroConta { get; set; }

        [Column("descricao")]
        public string Descricao { get; set; }

        [Column("documento"),StringLength(50)]
        public string Document { get; set; }

        [Column("tipo_receita_despesa")]
        public int TipoReceitaDespesa { get; set; }

        [Column("tipo_pagamento"), StringLength(50)]
        public string TipoPagamento { get; set; }

        [Column("valor"), MaxLength(13)]
        public decimal Valor { get; set; }

        [Column("status")StringLength(50)]
        public string Status { get; set; }

        [Column("data_lancamento")]
        public DateTime DataLancamento { get; set; }

        [Column("data_recebimento")]
        public DateTime DataRecebimento { get; set; }

        [Column("nome_banco"), StringLength(50)]
        public string  NomeBanco { get; set; }

        [Column("numero_banco"), StringLength(30)]
        public string NumeroBanco { get; set; }

        #region fk_historico
        [Column("id_Historico")]
        public int IdHistorico { get; set; }
        [ForeignKey("IdHistorico")]
        public Historico Historico { get; set; }
        #endregion

        #region fk_categoria_despesas
        [Column("id_categoria_despesas")]
        public int IdCategoriaDespesas { get; set; }
        [ForeignKey("IdCategoriaDepesas")]
        public CategoriaDespesa CategoriaDespesas { get; set; }
        #endregion

        #region fk_categoria_receita
        [Column("categoria_receita")]
        public int IdCategoriaReceita { get; set; }
        [ForeignKey("IdCategoriaReceita")]
        public CategoriaReceita CategoriaReceita { get; set; }
        #endregion

        #region fk_agencia
        [Column("agencia")]
        public int IdAgencia { get; set; }
        [ForeignKey("IdAgencia")]
        public Agencia Agencia { get; set; }
        #endregion 
    }
}
