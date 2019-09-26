using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class RelatorioController : BaseController
    {
        private CaixaRepository caixaRepository;
        private TransacoesRepository transacaoRepository;

        public RelatorioController()
        {
            caixaRepository = new CaixaRepository();
            transacaoRepository = new TransacoesRepository();
        }


        // GET: Relatorio
        public ActionResult Index()
        {
            return View();
        }

        // GET: Relatorio
        public ActionResult FluxoCaixa()
        {
            return View();
        }

        [HttpGet]
        public JsonResult FluxoCaixaDados(DateTime dataInicial, DateTime dataFinal)
        {
            var dadosCaixa = caixaRepository.ObterDadosSumarizados(dataInicial, dataFinal);
            var dadosTransacao = transacaoRepository.ObterDadosSumarizados(dataInicial, dataFinal);

            var json = new { };
            return Json(json, JsonRequestBehavior.AllowGet);
        }
    }
}