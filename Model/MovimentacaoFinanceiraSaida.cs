using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("movimentacao_financeira_saida")]
    public class MovimentacaoFinanceiraSaida
    {
        [Key,Column("id")]
        public int Id { get; set; }

        #region fk_contas_corrente
        [Column("IdContasCorrente")]
        public int IdContasCorrente { get; set; }

        #endregion

        #region fk_caixa
        [Column("IdCaixa")]
        public int IdCaixa { get; set; }

        [ForeignKey("IdCaixa")]
        public Caixa Caixa { get; set; }
        #endregion

        #region fk_parcelas_pagar

        #endregion
    }
}
