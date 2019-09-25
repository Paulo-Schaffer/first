using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("transacoes")]
    public class Transacao
    {


        [Key, Column("id")]
        public int Id { get; set; }

        [Column("descricao_transacao")]
        public string DescricaoTransacao { get; set; }

        [Column("documento")]
        public string Documento { get; set; }

        [Column("tipo_pagamento")]
        public string TipoPagamento { get; set; }

        [Column("valor")]
        public decimal Valor { get; set; }

        [Column("status")]
        public string Status { get; set; }

        [Column("data_lancamento")]
        public DateTime DataLancamento { get; set; }

        [Column("data_vencimento")]
        public DateTime DataVencimento { get; set; }

        [Column("data_recebimento")]
        public DateTime DataRecebimento { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }

        #region fk_cadastocontacorrente
        [Column("id_cadastrocontacorrente")]
        public int? IdCadastroContaCorrente { get; set; }
        [ForeignKey("IdCadastroContaCorrente")]
        public CadastroContaCorrente CadastroContaCorrente { get; set; }
        #endregion 

        #region fk_categoria_despesas
        [Column("id_categoria_despesa")]
        public int? IdCategoriaDespesa { get; set; }
        [ForeignKey("IdCategoriaDespesa")]
        public CategoriaDespesa CategoriaDespesa { get; set; }
        #endregion

        #region fk_categoria_receita
        [Column("id_categoria_receita")]
        public int? IdCategoriaReceita { get; set; }
        [ForeignKey("IdCategoriaReceita")]
        public CategoriaReceita CategoriaReceita { get; set; }
        #endregion

        #region fk_historico
        [Column("id_historico")]
        public int IdHistorico { get; set; }
        [ForeignKey("IdHistorico")]
        public Historico Historico { get; set; }
        #endregion
    }
}