using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("movimentacoes_financeira_entrada")]
    public class MovimentacaoFinanceiraEntrada
    {
        [Key, Column("id")]
        public int Id { get; set; }
        [Column("Valor")]
        public decimal Valor { get; set; }
        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }

        #region fk_conta_corrente
        [Column("id_conta_corrente")]
        public int IdContaCorrente { get; set; }
        [ForeignKey("IdContaCorrente")]
        public Transacao ContaCorrente { get; set; }
        #endregion

        #region fk_caixa
        [Column("id_caixa")]
        public int IdCaixa { get; set; }
        [ForeignKey("IdCaixa")]
        public Caixa Caixa { get; set; }
        #endregion

        #region fk_parcela_receber
        [Column("parcela_receber")]
        public int IdParcelaReceber { get; set; }
        [ForeignKey("IdParcelaReceber")]
        public ParcelaReceber parcelaReceber { get; set; }
        #endregion


    }
}

