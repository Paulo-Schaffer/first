using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class CaixaController : BaseController
    {
        private CaixaRepository repository;

        public CaixaController()
        {
            repository = new CaixaRepository();
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet, Route("obterTodos")]
        public JsonResult ObterTodos()
        {
            var caixa = repository.ObterTodos();
            var resultado = new { data = caixa };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpPost, Route("inserir")]
        public JsonResult Inserir(Caixa caixa)
        {
            caixa.RegistroAtivo = true;
            var id = repository.Inserir(caixa);
            var resultado = new { id = id };
            return Json(resultado);
        }

        [HttpGet, Route("apagar")]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpPost, Route("update")]
        public JsonResult Update(Caixa caixa)
        {
            var alterou = repository.Alterar(caixa);
            var resultado = new { status = alterou };
            return Json(resultado);
        }
        [HttpGet, Route("caixa")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("caixa/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var caixas = repository.ObterTodos();

            List<object> caixasSelect2 =
                new List<object>();
            foreach (Caixa caixa in caixas)
            {
                caixasSelect2.Add(new
                {
                    id = caixa.Id,
                    text = caixa.Descricao

                });
            }
            var resultado = new
            {
                results = caixasSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        //[HttpGet]
        //public JsonResult ObterTodosRelatorio(DateTime dataLancamentoInicial, DateTime dataLancamentoFinal, int idHistorico = 0, string descricao = "", int valor = 0)
        //{
        //    var caixa = repository.ObterTodosRelatorio(dataLancamentoInicial, dataLancamentoFinal, idHistorico, descricao, valor);
        //    var resultado = new { data = caixa };
        //    return Json(resultado, JsonRequestBehavior.AllowGet);
        //}
    }
}
