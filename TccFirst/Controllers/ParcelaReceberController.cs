using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{    [Route("parcelasReceber/")]
    public class ParcelaReceberController : Controller
    {
        ParcelaReceberRepository repository;

        public ParcelaReceberController()
        {
            repository = new ParcelaReceberRepository();
        }
        [HttpPost,Route("obtertodos")]
        public JsonResult ObterTodos()
        {
            var parcelasReceber = repository.ObterTodos();
            var resultado = new { data = parcelasReceber };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpPost,Route("cadastro")]
        public ActionResult Cadastro(ParcelaReceber parcelaReceber)
        {
            int id = repository.Inserir(parcelaReceber);
            return RedirectToAction("Editar", new { id = id });
        }
        [HttpPost,Route("editar")]
        public JsonResult Editar (ParcelaReceber parcelaReceber)
        {
            var alterou = repository.Alterar(parcelaReceber);
            var resultado = new { status = alterou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpGet,Route("apagar")]
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

        public ActionResult Editar(int id)
        {
            var parcelaReceber = repository.ObterPeloId(id);
            if(parcelaReceber==null)
            {
                return RedirectToAction("Index");
                
            }
            ViewBag.parcelaReceber = parcelaReceber;
            return View();
        }

    }
}