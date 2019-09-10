﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("categoria_despesa")]
    public class CategoriaDespesa
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Column("tipo_categoria_despesa")]
        public string TipoCategoriaDespesa { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }
    }
}
