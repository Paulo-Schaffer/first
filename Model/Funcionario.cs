using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("funcionarios")]
    public class Funcionario
    {
        [Key,Column("id")]
        public int Id { get; set; }

        [Column("nome_funcionario")]
        public string NomeFuncionario { get; set; }

        [Column("tipo_funcionario")]
        public string TipoFuncionario { get; set; }

        [Column("usuario")]
        public string Usuario { get; set; }

        [Column("senha")]
        public string Senha { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }

    }
}
