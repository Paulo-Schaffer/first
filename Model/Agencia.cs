﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("agencias")]
    public class Agencia
    {
        [Key,Column("id")]
        public int Id { get; set; }


        [Column("banco")]
        public string  Banco { get; set; }


        [Column("nome_agencia")]
        public string NomeAgencia { get; set; }


        [Column("numero_agencia")]
        public int NumeroAgencia { get; set; }

        [Column("registro_ativo")]
        public bool RegistroAtivo { get; set; }


    }
}
