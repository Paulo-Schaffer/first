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

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ObteTodos()
        {
            var parcelaspagar = repository.ObterTodos();
            var resultado = new { data = parcelaspagar };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }


        [HttpGet, Route("parcelasPagar/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GerarParcelas(decimal valor, int quantidadesPacelas, int idTituloPagar)
        {
            repository.GerarParcelas(valor, quantidadesPacelas, idTituloPagar);
            return Json(valor);
        }


        //[HttpGet, Route("parcelasPagar/obtertodosselect2")]
        //public JsonResult ObterTodosSelect2(string termo)
        //{
        //    var parcelasPagar = repository.ObterTodos();
        //    List<object> parcelasPagarSelect2 = new List<object>();
        //    foreach (parcelasPagar parcelasPagar in parcelasPagar)
        //    {
        //        parcelasPagarSelect.Add(new
        //        {
        //            id = parcelasPagar.Id,
        //            valor = parcelasPagar.Valor,
        //            status = parcelasPagar.Status,
        //            dataVencimento = parcelasPagar.DataVencimento,
        //            dataPagamento = parcelasPagar.DataPagamento

        //        });
        //    }
        //}
    }
}