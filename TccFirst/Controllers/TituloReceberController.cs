using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
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

        [HttpPost, Route("cadastro")]
        public ActionResult Cadastro(TituloReceber tituloReceber)
        {
            tituloReceber.RegistroAtivo = true;
            int id = repository.Inserir(tituloReceber);
            return Json(new { id = id });
        }

        [HttpPost, Route("editar")] 
        public JsonResult Editar(TituloReceber tituloReceber)
        {
            var alterou = repository.Alterar(tituloReceber);
            var resultado = new { status = alterou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        
        [HttpGet,Route("apagar")]
        JsonResult Apagar(int id)
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

        //[HttpGet,Route("editar")]
        //ActionResult Editar(int id)
        //{
        //    var titulosReceber = repository.ObterPeloId(id);
        //    if (titulosReceber == null)
        //        return RedirectToAction("Index");
        //    ViewBag.TituloReceber = titulosReceber;
        //    return View();

        //}
        [HttpGet, Route("tituloReceber/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }
        [HttpGet, Route("tituloReceber/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var titulosReceber = repository.ObterTodos();
            List<object> tituloRecebersSelect2 =
                 new List<object>();
            foreach (TituloReceber tituloReceber in titulosReceber)
            {
                tituloRecebersSelect2.Add(new
                {
                    id = tituloReceber.Id,
                    text = tituloReceber.Descricao,

                });
            }
            var resultado = new
            {
                results = tituloRecebersSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }

        

    }
}