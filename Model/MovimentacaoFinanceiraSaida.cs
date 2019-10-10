using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("movimentacoes_financeira_saida")]
    public class MovimentacaoFinanceiraSaida
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Column("Valor")]
        public decimal Valor { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }

        #region fk_conta_corrente
        [Column("id_conta_corrente")]
        public int IDContaCorrente { get; set; }
        [ForeignKey("IDContaCorrente")]
        public Transacao transacao { get; set; }
        #endregion

        #region fk_caixa
        [Column("id_caixa")]
        public int IdCaixa { get; set; }
        [ForeignKey("IdCaixa")]
        public Caixa Caixas { get; set; }
        #endregion

        #region fk_parcela_pagar
        [Column("id_parcela_pagar")]
        public int IdParcelaPagar { get; set; }
        [ForeignKey("IdParcelaPagar")]
        public ParcelaPagar ParcelaPagar { get; set; }
        #endregion
    }
}
