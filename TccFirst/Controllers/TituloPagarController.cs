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
    public class TituloPagarController : BaseController
    {
        private TituloPagarRepository repository;

        public TituloPagarController()
        {
            repository = new TituloPagarRepository();
        }


        [HttpGet, Route("obterTodos")]
        public JsonResult ObterTodos()
        {
            var titulosPagar = repository.ObterTodos();
            var resultado = new { data = titulosPagar };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost, Route("cadastro")]
        public ActionResult Cadastro(TituloPagar tituloPagar)
        {
            tituloPagar.RegistroAtivo = true;
            int id = repository.Inserir(tituloPagar);
            return RedirectToAction("Editar", new { id = id });
        }
        #endregion 

        [HttpGet, Route("apagar")]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        #region Editar
        [HttpPost, Route("editar")]
        public JsonResult Editar(TituloPagar tituloPagar)
        {
            var alterou = repository.Alterar(tituloPagar);
            var resultado = new { status = alterou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index()
        {

        [HttpGet, Route("tituloPagar/obtertodosselect")]
        public JsonResult ObterTodosSelect(string termo)
        {
            var tituloPagars = repository.ObterTodos();
            List<object> ObterTodosSelect2 = new List<object>();
            foreach (TituloPagar tituloPagar in tituloPagars)
            {
                ObterTodosSelect2.Add(new
                {
                    id = tituloPagar.Id,
                    text = tituloPagar.Descricao,
                });
            }
            var resultado = new
            {
                results = ObterTodosSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }
    }
}
