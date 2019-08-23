using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    class MovimentacaoFinanceiraEntrada
    {
        [Table("movimentacoes_financeiras_entrada")]
        public class MovimentacoesFinanceirasEntrada
        {
            [Key, Column("id")]
            public int Id { get; set; }

            [Column("valor")]
            public decimal Valor { get; set; }

            #region key_conta_corrente
            [Column("id_conta_corrente")]
            public int IdContaCorrente { get; set; }

            [ForeignKey("IdContaCorrente")]
            public ContaCorrente ContaCorrente { get; set; }
            #endregion

            #region key_id_caixa
            [Column("id_caixa")]
            public int IdCaixa { get; set; }

            [ForeignKey("IdCaixa")]
            public Caixa Caixa { get; set; }
            #endregion

            #region key_parcela_receber
            [Column("id_parcela_receber")]
            public int  IdParecelaReceber { get; set; }

            [ForeignKey("IdParcelaReceber")]
            public ParcelaReceber ParcelaReceber { get; set; }
            #endregion

        }
    }
}
