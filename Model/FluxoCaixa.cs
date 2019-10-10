using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class FluxoCaixa
    {
        public string Data { get; set; }
        public DateTime DataOriginal
        {
            get
            {
                return DateTime.Parse(Data);
            }
        }
        public decimal Valor { get; set; }
    }
}
