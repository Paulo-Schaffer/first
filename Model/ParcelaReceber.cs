using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("parcelas_receber")]
    public class ParcelaReceber
    {
        [Key, Column("id")]
        public int id { get; set; }

        [Column("valor"), MaxLength(13)]
        public decimal Valor { get; set; }

        [Column("status")]
        public int Status { get; set; }

        [Column("data_vencimento")]
        public DateTime DataVencimento { get; set; }

        [Column("data_recebimento")]
        public DateTime DataRecebimento { get; set; }


        #region FK Titulo Receber
        [Column("id_titulo_receber")]
        public int IdTituloReceber { get; set; }

        [ForeignKey("IdTituloReceber")]
        public TituloReceber TituloReceber { get; set; }
        #endregion 

    }
}
