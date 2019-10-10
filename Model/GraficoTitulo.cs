using System;

namespace Model
{
    public class GraficoTitulo
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
