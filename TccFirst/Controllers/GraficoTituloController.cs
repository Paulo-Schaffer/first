using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class GraficoTituloController : Controller
    {
        private TituloPagarRepository tituloPagarRepository;
        private TituloReceberRepository tituloReceberRepository;

        public GraficoTituloController()
        {
            tituloPagarRepository = new TituloPagarRepository();
            tituloReceberRepository = new TituloReceberRepository();
        }
        // GET: GraficoTitulo
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GraficoDados(DateTime dataInicial, DateTime dataFinal)
        {
            var dadosTituloPagar = tituloPagarRepository.ObterDadosSumarizados(dataInicial, dataFinal);
            var dadosTituloReceber = tituloReceberRepository.ObterDadosSumarizados(dataInicial, dataFinal);

            List<Dadoss> retorno = new List<Dadoss>();
            double quantidade = (dataFinal - dataInicial).TotalDays;

            for (int i = 0; i < quantidade; i++)
            {
                DateTime data = dataInicial.AddDays(i);
                retorno.Add(new Dadoss()
                {
                    TituloPagar = 0,
                    TituloReceber = 0,
                    Data = data
                });
            }
            foreach (var tituloPagar in dadosTituloPagar)
            {
                foreach (var dado in retorno)
                {
                    if (tituloPagar.DataOriginal.Date == dado.Data.Date)
                    {
                        dado.TituloPagar = tituloPagar.Valor;
                    }
                }
            }
            foreach (var titulorReceber in dadosTituloReceber)
            {
                foreach (var dado in retorno)
                {
                    if (titulorReceber.DataOriginal.Date == dado.Data.Date)
                    {
                        dado.TituloReceber = titulorReceber.Valor;
                    }
                }
            }

            return Json(retorno, JsonRequestBehavior.AllowGet);
        }
    }
    public class Dadoss
    {
        public DateTime Data { get; set; }
        public decimal TituloPagar { get; set; }
        public decimal TituloReceber { get; set; }
        public string DataCompleta
        {
            get
            {
                return Data.ToString("dd/MM/yyyy");
            }
        }
    }
}