using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class HistoricoController : Controller
    {
        private HistoricoRepository repository;

        public HistoricoController()
        {
            repository = new HistoricoRepository();
        }
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ObterTodos()
        {
            var historico = repository.ObterTodos();
            var resultado = new { data = historico };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Inserir(Historico historico)
        {
            historico.RegistroAtivo = true;
            var id = repository.Inserir(historico);
            var resultado = new { id = id };
            return Json(resultado);
        }
        [HttpGet]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Update(Historico historico)
        {
            var alterou = repository.Alterar(historico);
            var resultado = new { status = alterou };
            return Json(resultado);
        }
        [HttpGet, Route("historico/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }
        [HttpGet, Route("historico/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var historicos = repository.ObterTodos();

            List<object> historicoSelect2 =
                new List<object>();
            foreach (Historico historico in historicos)
            {
                historicoSelect2.Add(new
                {
                    id = historico.Id,
                    descricao = historico.Descricao


                });
            }
            var resultado = new
            {
                results = historicoSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
    }
}