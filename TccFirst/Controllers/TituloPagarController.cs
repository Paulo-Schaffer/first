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


        public ActionResult Index()
        {
            TituloPagarRepository repositoryTituloPagar = new TituloPagarRepository();
            ViewBag.TitulosPagar = repositoryTituloPagar.ObterTodos();
            return View();
        }

        [HttpGet, Route("obterTodos")]
        public JsonResult ObterTodos()
        {
            var titulosPagar = repository.ObterTodos();
            var resultado = new { data = titulosPagar };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        #region Cadastro
        [HttpGet, Route("Index")]
        public ActionResult Cadastro()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Cadastro(TituloPagar tituloPagar)
        {
            tituloPagar.RegistroAtivo = true;
            tituloPagar.Status = TituloPagar.StatusPendente;
            int id = repository.Inserir(tituloPagar);
            var resultado = new { id = id };
            return RedirectToAction("Index", resultado);
        }
        #endregion 

        [HttpGet, Route("apagar")]
        public ActionResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return RedirectToAction("Index", new { id = id });
        }

        #region Editar
        [HttpPost, Route("editar")]
        public ActionResult Editar(TituloPagar tituloPagar)
        {
            var alterou = repository.Alterar(tituloPagar);
            var resultado = new { status = alterou };
            return RedirectToAction("Index", new { id = resultado});
        }

        public ActionResult Editar(int id)
        {
            var tituloPagar = repository.ObterPeloId(id);
            ViewBag.TituloPagar = tituloPagar;
            return View();
        }
        #endregion

        //[HttpGet, Route("tituloPagar/")]
        //public JsonResult ObterPeloId(int id)
        //{
        //    return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        //}

        [HttpGet, Route("tituloPagar/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string termo)
        {
            var tituloPagars = repository.ObterTodos();
            List<object> ObterTodosSelect2 = new List<object>();
            foreach (TituloPagar tituloPagar in tituloPagars)
            {
                if (tituloPagar.Id == 1)
                {
                    ObterTodosSelect2.Add(new
                    {
                        id = tituloPagar.Id,
                        text = tituloPagar.Descricao,
                        selected = true,
                    });
                }
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
        public JsonResult ObterTodosRelatorio(string dataInicial, string dataFinal, string descricao = "", int valor = 0, int idDespesa = 0)
        {
            var tituloReceber = repository.ObterTodosRelatorio(dataInicial, dataFinal, descricao, valor, idDespesa);
            var resultado = new { data = tituloReceber };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
    }
}