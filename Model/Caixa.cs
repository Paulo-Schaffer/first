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

        [Column("status")]
        public string Status { get; set; }

        [Column("historico")]
        public string Historico { get; set; }

        [Column("registroativo")]
        public bool RegistroAtivo { get; set; }

    }
}
