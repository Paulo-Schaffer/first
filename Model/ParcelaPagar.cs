using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("parcelas_pagar")]
    public class ParcelaPagar
    {
        [Key,Column("id")]
        public int Id { get; set; }

        [Column("valor")]
        public decimal Valor { get; set; }

        [Column("status"), StringLength(50)]
        public string? Status { get; set; }

        [Column("DataVecimento")]
        public DateTime DataVencimento { get; set; }

        [Column("DataPagamento")]
        public DateTime? DataPagamento { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }

        [Column("id_titulo_pagar")]
        public int IdTituloPagar { get; set; }

    }
}
