using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("parcelas_pagar")]
    public class ParcelaPagar
    {
        public const string StatusPendente = "Pendente";
        public const string StatusPago = "Pago";

        [Key, Column("id")]
        public int Id { get; set; }

        [Column("valor")]
        public decimal Valor { get; set; }

        [Column("status"), StringLength(50)]
        public string Status { get; set; }

        [Column("DataVecimento")]
        public DateTime? DataVencimento { get; set; }

        [Column("DataPagamento")]
        public DateTime? DataPagamento { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }

        #region fk titulo pagar
        [Column("id_titulo_pagar")]
        public int IdTituloPagar { get; set; }
        #endregion
    }
}