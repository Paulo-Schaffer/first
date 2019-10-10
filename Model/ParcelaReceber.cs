﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("parcela_receber")]
   public  class ParcelaReceber
    {
        public const string StatusPendente = "Pendente";
        public const string StatusPago = "Pago";

        [Key, Column("id")]
        public int Id { get; set; }

        [Column("valor")]
        public decimal Valor { get; set; }

        [Column("status")]
        public string Status { get; set; }

        [Column("DataVencimento")]
        public DateTime? DataVencimento { get; set; }

        [Column("DataRecebimento")]
        public DateTime? DataRecebimento { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }

        #region fk_titulo_receber
        [Column("id_titulo_receber")]
        public int IdTituloReceber { get; set; }
        [ForeignKey("IdTituloReceber")]
        public TituloReceber TituloReceber { get; set; }
        #endregion

    }

}
