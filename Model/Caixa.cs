using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("caixas")]
    public class Caixa
    {
        public const int FiltroSemHistorico = 0;

        [Key, Column("id")]
        public int Id { get; set; }
        [Column("descricao")]
        public string Descricao { get; set; }

        [Column("documento")]
        public string Documento { get; set; }

        [Column("forma_pagamento")]
        public string FormaPagamento { get; set; }

        [Column("valor")]
        public decimal Valor { get; set; }

        [Column("data_lancamento")]
        public DateTime DataLancamento { get; set; }

        [Column("operacao")]
        public string Operacao { get; set; }

        #region fk_historico
        [Column("id_historicos")]
        public int IdHistoricos { get; set; }

        [ForeignKey("IdHistoricos")]
        public Historico Historico { get; set; }
        #endregion

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }
    }
}