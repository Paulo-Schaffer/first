using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    [Route("tituloPagar/")]
    public class TituloPagarController : Controller
    {
        private TituloPagarRepository repository;

        public TituloPagarController()
        {
            repository = new TituloPagarRepository();
        }

        [HttpGet, Route("obtertodos")]
        public JsonResult ObterTodos()
        {
            var tituloPagar = repository.ObterTodos();
            var resultado = new { data = tituloPagar };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost, Route("cadastro")]
        public ActionResult Cadastro(TituloPagar tituloPagar)
        {
            int id = repository.Inserir(tituloPagar);
            return RedirectToAction("Editar", new { id = id });
        }

        [HttpPost, Route("editar")]
        public JsonResult Editar(TituloPagar tituloPagar)
        {
            var alterou = repository.Alterar(tituloPagar);
            var resultado = new { status = alterou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Cadastro()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            var venda = repository.ObterPeloId(id);
            if (venda == null)
                return RedirectToAction("Index");

            ViewBag.Venda = venda;
            return View();
        }
    }
}