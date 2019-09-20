using Model;
using Repository.Interfaces;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    [Route("movimentacaofinanceiraentrada/")]
    public class MovimentacaoFinanceiraEntradaController : BaseController
    {
        private MovimentacaoFinaceiraEntradaRepository repository;

        public MovimentacaoFinanceiraEntradaController()
        {
            repository = new MovimentacaoFinaceiraEntradaRepository();
        }


        [HttpGet, Route("obtertodos")]
        public JsonResult ObterTodos()
        {
            var movimentacaoFinanceiraEntrada = repository.ObterTodos();
            var resultado = new { data = movimentacaoFinanceiraEntrada };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost, Route("cadastro")]
        public JsonResult Cadastro(MovimentacaoFinanceiraEntrada movimentacaoFinaceiraEntrada)
        {
            movimentacaoFinaceiraEntrada.RegistroAtivo = true;
            var id = repository.Inserir(movimentacaoFinaceiraEntrada);
            return Json(new { id = id });
        }
        [HttpPost, Route("editar")]
        public JsonResult Editar(MovimentacaoFinanceiraEntrada movimentacaoFinanceiraEntrada)
        {
            var alterou = repository.Alterar(movimentacaoFinanceiraEntrada);
            var resultado = new { status = alterou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("apagar")]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }

        [HttpGet, Route("obterpeloid")]
        public ActionResult ObterPeloId(int id)
        {
            var movimentacoesEntradas = repository.ObterPeloId(id);
            if (movimentacoesEntradas == null)
                return HttpNotFound();
            return Json(movimentacoesEntradas, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Cadastro()
        {
            return View();
        }

        [HttpGet, Route("movimentacaoFinanceiraEntrada/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var movimentacaoFinanceiraEntradas = repository.ObterTodos();

            List<object> movimentacaoFinanceiraEntradaSelect2 =
                new List<object>();
            foreach (MovimentacaoFinanceiraEntrada movimentacaoFinanceiraEntrada in movimentacaoFinanceiraEntradaSelect2)
            {
                movimentacaoFinanceiraEntradaSelect2.Add(new
                {
                    id = movimentacaoFinanceiraEntrada.Id,
                    text = movimentacaoFinanceiraEntrada.Valor
                });
            }
            var resultado = new
            {
                results = movimentacaoFinanceiraEntradaSelect2
            };
            return Json(resultado,
                JsonRequestBehavior.AllowGet);

        }
    }
}