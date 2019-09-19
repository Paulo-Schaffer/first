using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    
    public class ParcelaReceberController : Controller
    {
        private ParcelaReceberRepository repository;

        public ParcelaReceberController()
        {
            repository = new ParcelaReceberRepository();
        }
        
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet, Route("obterTodos")]
        public JsonResult ObterTodos()
        {
            var parcelasReceber = repository.ObterTodos();
            var resultado = new { data = parcelasReceber };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        
        [HttpGet, Route[("parcelaReceber/")]
        public JsonResult ObterPeloId(int id)
        {           
            return Json(repository.ObterPeloId(id),JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GerarParcelas(decimal valor, int quantidadesPacelas, int idTituloReceber)
        {
            repository.GerarParcelas(valor, quantidadesPacelas, idTituloReceber);
            return Json(valor);
        }

        [HttpGet,Route("parcelaReceber/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var parcelasReceber = repository.ObterTodos();
            List<object>parcelaRecebersSelect2=
                 new List<object>();
            foreach(ParcelaReceber parcelaReceber in parcelasReceber)
            {
                parcelaRecebersSelect2.Add(new
                {
                    id = parcelaReceber.Id,
                    valor= parcelaReceber.Valor,
                    status=parcelaReceber.Status,

                });
            }
            var resultado = new
            {
                results = parcelaRecebersSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }

        public ActionResult Cadastro()
        {
            return View();
        }

    }
}