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

        [HttpGet, Route("apagar")]
        public ActionResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return RedirectToAction("Index", new { id = id });
        }

        #region Cadastro
        [HttpPost]
        public ActionResult Cadastro(TituloReceber tituloReceber)
        {
            tituloReceber.RegistroAtivo = true;
            int id = repository.Inserir(tituloReceber);
            var resultado = new { id = id };
            return RedirectToAction("Index",resultado);
        }

        public ActionResult Cadastro()
        {
            return View();
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

        public ActionResult Editar()
        {
            return View();
        }
        #endregion

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
                    text = tituloReceber.Descricao, tituloReceber.ValorTotal,tituloReceber.DataLancamento,

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