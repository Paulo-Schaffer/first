using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    [Route("tituloreceber/")]
    public class TituloReceberController : Controller
    {
        private TituloReceberRepository repository;

        public TituloReceberController()
        {
            repository = new TituloReceberRepository();
        }


        [HttpGet, Route("obterTodos")]
        public JsonResult ObterTodos()
        {
            var titulosReceber = repository.ObterTodos();
            var resultado = new { data = titulosReceber };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("apagar")]
        public ActionResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return RedirectToAction("Index", new { id = id });
        }

        #region Cadastro
        [HttpGet,Route("Index")]
        public ActionResult Cadastro()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Cadastro(TituloReceber tituloReceber)
        {
            tituloReceber.RegistroAtivo = true;
            int id = repository.Inserir(tituloReceber);
            var resultado = new { id = id };
            return RedirectToAction("Index",resultado);
        }
        #endregion

        #region Editar
        [HttpPost, Route("editar")]
        public JsonResult Editar(TituloReceber tituloReceber)   
        {
            var alterou = repository.Alterar(tituloReceber);
            var resultado = new { status = alterou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Editar(int id)
        {
            var tituloReceber = repository.ObterPeloId(id);
            ViewBag.TituloReceber = tituloReceber;
            return View();
        }
        #endregion

        public ActionResult Index()
        {
            return View();
        }

        //public ActionResult Cadastro()
        //{
        //    return View();
        //}
    }
}