using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("caixas")]
    public class Caixa
    {
        [Key,Column("id")]
        public int Id { get; set; }

        #region fk_id_historico
        [Column("id_historico")]
        public int IdHistorico { get; set; }

        [ForeignKey("IdHistorico")]
        public Historico Historico{ get; set; }
        #endregion

        [Column("descricao")]
        public string Descricao { get; set; }

        [Column("documento"), StringLength(45)]
        public string Documento { get; set; }

        [Column("forma_pagamento"), MaxLength(15)]
        public decimal Valor { get; set; }  

        [Column("data_lancamento")]
        public DateTime DataLançamento { get; set; }

        [Column("status"), StringLength(45)]
        public string Status { get; set; }


    }
}
