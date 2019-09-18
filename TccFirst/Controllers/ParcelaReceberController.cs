using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    [Route("parcelaReceber/")]
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
        [HttpPost, Route("cadastro")]
        public ActionResult Cadastro(ParcelaReceber parcelaReceber)
        {
            parcelaReceber.RegistroAtivo = true;
            int id = repository.Inserir(parcelaReceber);
            return Json (new { id = id });
        }
        [HttpGet, Route("apagar")]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpPost, Route("editar")]
        public JsonResult Editar(ParcelaReceber parcelaReceber)
        {
            var alterou = repository.Alterar(parcelaReceber);
            var resultado = new { status = alterou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpGet, Route("obterpeloid")]
        public ActionResult ObterPeloId(int id)
        {
            var parcelaReceber = repository.ObterPeloId(id);
            if (parcelaReceber == null)
                return HttpNotFound();

            return Json(parcelaReceber,JsonRequestBehavior.AllowGet);

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