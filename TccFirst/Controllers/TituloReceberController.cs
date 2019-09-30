using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    //[Route("tituloreceber/")]
    public class TituloReceberController : BaseController
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

        [HttpPost, Route("cadastro")]
        public ActionResult Cadastro(TituloReceber tituloReceber)
        {
            tituloReceber.RegistroAtivo = true;
            int id = repository.Inserir(tituloReceber);
            return Json(new { id = id });
        }

        [HttpPost, Route("editar")] 
        public ActionResult Editar(TituloReceber tituloReceber)
        {
            var alterou = repository.Alterar(tituloReceber);
            var resultado = new { status = alterou };
            return RedirectToAction("Index", new { id = resultado});
        }
        
        [HttpGet,Route("apagar")]
        JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        //public ActionResult Index()
        //{
        //    return View();
        //}

        #region Index
        [HttpGet]
        public ActionResult Index()
        {
            TituloReceberRepository tituloReceberRepository = new TituloReceberRepository();
            ViewBag.TitulosReceber = tituloReceberRepository.ObterTodos();
            return View();
        }
        #endregion

        //[HttpGet, Route("tituloreceber")]
        //public JsonResult ObterPeloId(int id)
        //{
        //    return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        //}

    }
}