using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("titulos_receber")]
    public class TituloReceber
    {
        public const int FiltroSemCliente = 0;

        public const string StatusPendente = "Pendente";
        public const string StatusPagoParcialmente = "Parcialmente";
        public const string StatusCancelado = "Cancelado";
        public const string StatusFinalizado = "Finalizado";

        [Key, Column("id")]
        public int Id { get; set; }

        [Column("descricao")]
        public string Descricao { get; set; }

        [Column("valor_total")]
        public decimal ValorTotal { get; set; }

        [Column("status")]
        public string Status { get; set; }

        [Column("data_lancamento")]
        public DateTime? DataLancamento { get; set; }

        [Column("data_recebimento")]
        public DateTime DataRecebimento { get; set; }

        [Column("data_vencimento")]
        public DateTime? DataVencimento { get; set; }

        [Column("quantidade_parcela")]
        public int QuantidadeParcela { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }

        [NotMapped]
        public string NomeCliente
        {
            get
            {
                if (ClientePessoaJuridica != null)
                {
                    return ClientePessoaJuridica.RazaoSocial;
                }
                else if (ClientePessoaFisica != null)
                {
                    return ClientePessoaFisica.Nome;
                }
                else
                {
                    return "";
                }
            }
        }

        #region fk_cliente_pessoa_fisica    
        [Column("id_cliente_pessoa_fisica")]
        public int? IdClientePessoaFisica { get; set; }
        [ForeignKey("IdClientePessoaFisica")]
        public ClientePessoaFisica ClientePessoaFisica { get; set; }
        #endregion

        #region fk_cliente_pessoa_juridica
        [Column("id_cliente_pessoa_juridica")]
        public int? IdClientePessoaJuridica { get; set; }
        [ForeignKey("IdClientePessoaJuridica")]
        public ClientePessoaJuridica ClientePessoaJuridica { get; set; }
        #endregion

        #region fk_categoria_receita 
        [Column("id_categoria_receita")]
        public int? IdCategoriaReceita { get; set; }
        [ForeignKey("IdCategoriaReceita")]
        public CategoriaReceita CategoriaReceita { get; set; }
        #endregion

    }
}