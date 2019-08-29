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

        [HttpPost]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Inserir(TituloReceber tituloReceber)
        {
            tituloReceber.RegistroAtivo = true;
            var id = repository.Inserir(tituloReceber);
            var resultado = new { id = id };
            return Json (resultado);
        }
        [HttpGet]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Upadate(TituloReceber tituloReceber)
        {
            var alterou = repository.Alterar(tituloReceber);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

        [HttpGet,Route("tituloReceber/obterpeloid")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpGet,Route("tituloReceber/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var titulosReceber = repository.ObterTodos();
            List<object> titulosReceberSelect2 = new List<object>();

            foreach (TituloReceber tituloReceber in titulosReceber)
            {
                titulosReceberSelect2.Add(new
                {
                    id = tituloReceber.Id,
                    descricao = tituloReceber.Descricao,
                    valorTotal = tituloReceber.ValorTotal,
                    status = tituloReceber.Status,
                    dataLancamento = tituloReceber.DataLancamento,
                    dataRecebimento = tituloReceber.DataRecebimento,
                    dataVencimento = tituloReceber.DataVencimento,
                    complemento = tituloReceber.Complemento,
                    quantidadeParcela = tituloReceber.QuantidadeParcela,
                    registroAtivo = tituloReceber.RegistroAtivo,
                });
            }
        
        var resultado = new
        {
            results = titulosReceberSelect2
        };

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
    }
}