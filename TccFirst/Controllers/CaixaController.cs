using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class CaixaController : Controller
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

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var caixa = repository.ObterTodos();
            var resultado = new { data = caixa };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Inserir(Caixa caixa)
        {
            caixa.RegistroAtivo = true;
            var id = repository.Inserir(caixa);
            var resultado = new { id = id };
            return Json(resultado);
        }
        [HttpGet]
        JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Update(Caixa caixa)
        {
            var alterou = repository.Alterar(caixa);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

    }
}