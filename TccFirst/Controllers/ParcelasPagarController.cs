using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class ParcelasPagarController : BaseController
    {
        public ParcelaPagarRepository repository;

        public ParcelasPagarController()
        {
            repository = new ParcelaPagarRepository();
        }

        //public ActionResult Index()
        //{
        //    //return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        //}

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var parcelaspagar = repository.ObterTodos();
            var resultado = new { data = parcelaspagar };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        //[HttpGet, Route("parcelasPagar/obtertodosselect2")]
        //public JsonResult ObterTodosSelect2(string termo)
        //{
        //    var parcelasPagar = repository.ObterTodos();
        //    List<object> parcelasPagarSelect2 = new List<object>();
        [HttpPost]
        public ActionResult Cadastro(ParcelaPagar parcelaPagar)
        {
            parcelaPagar.RegistroAtivo = true;
            var id = repository.Inserir(parcelaPagar);
            var resultado = new { id = id };
            return RedirectToAction("Index", new { id = id });
        }
        

        #region Apagar 
        [HttpGet, Route("apagar")]
        public ActionResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return RedirectToAction("Index", new { id = id });
        }

        #endregion

        #region editar

        [HttpPost, Route("editar")]
        public ActionResult Editar(ParcelaPagar parcelaPagar)
        {
            var alterou = repository.Alterar(parcelaPagar);
            var resultado = new { status = alterou };
            return RedirectToAction("Index", new { id = resultado });

        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            var parcelaPagar = repository.ObterPeloId(id);
            ViewBag.ParcelaPagar = parcelaPagar;
            return View();
        }
        #endregion

        #region obtertodosselect2

        [HttpGet, Route("parcelaPagar/obtertodosselect")]
        public JsonResult ObterTodosSelect(string termo)
        {
            var parcelaPagar = repository.ObterTodos();
            List<object> parcelaPagarSelect = new List<object>();
            foreach (ParcelaPagar parcelasPagar in parcelaPagar)
            {
                parcelaPagarSelect.Add(new
                {
                    id = parcelasPagar.Id,
                    valor = parcelasPagar.Valor,
                    status = parcelasPagar.Status,
                    dataPagamento = parcelasPagar.DataPagamento,
                    dataVencimento  = parcelasPagar.DataVencimento
                });
            }
            var resultado = new
            {
                resultados = parcelaPagarSelect
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }
        #endregion
    }
}