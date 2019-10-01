using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class ParcelasReceberController : BaseController
    {
        public ParcelaReceberRepository repository;

        public  ParcelasReceberController()
        {
            repository = new ParcelaReceberRepository();
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
        public JsonResult ObterTodos(int idTituloReceber)
        {
            var parcelasReceber = repository.ObterTodos(idTituloReceber);
            var resultado = new { data = parcelasReceber };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        // [HttpGet,Route("parcelaReceber/obtertodosselect2")]
        //public JsonResult ObterTodosSelect2(string term)
        //{
        //  var parcelasReceber = repository.ObterTodos(idTituloReceber);
        //List<object>parcelaRecebersSelect2=
        //         new List<object>();
        //    foreach(ParcelaReceber parcelaReceber in parcelasReceber)
        //    {
        //        parcelaRecebersSelect2.Add(new
        //        {
        //            id = parcelaReceber.Id,
        //            valor= parcelaReceber.Valor,
        //             status=parcelaReceber.Status,
        //
        //         });
        //     }
        //     var resultado = new
        //     {
        //         results = parcelaRecebersSelect2
        //     };
        //     return Json(resultado, JsonRequestBehavior.AllowGet);

        // }

        [HttpPost]
        public JsonResult Inserir(ParcelaReceber parcelaReceber)
        {
            parcelaReceber.RegistroAtivo = true;
            var id = repository.Inserir(parcelaReceber);
            var resultado = new { id = id };
            return Json(resultado);
        }

        [HttpGet]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado);
        }

        [HttpPost]
        public JsonResult Update(ParcelaReceber parcelaReceber)
        {
            var alterou = repository.Alterar(parcelaReceber);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

        [HttpGet, Route("parcelaReceber/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GerarParcelas(int idTituloReceber)
        {
            repository.GerarParcelas(idTituloReceber);
            return Json(idTituloReceber, JsonRequestBehavior.AllowGet);
        }

    }
}
