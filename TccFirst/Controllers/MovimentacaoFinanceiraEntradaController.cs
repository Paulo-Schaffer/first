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

        #region Verificações Login
        private bool VerificaLogado()
        {
            if (Session["usuarioLogadoTipoFuncionario"] == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        private ActionResult VerificaPermisssao()
        {
            if (VerificaLogado() == false)
            {
                return Redirect("/login");
            }

            if ((Session["usuarioLogadoTipoFuncionario"].ToString() == "Funcionario") || (Session["usuarioLogadoTipoFuncionario"].ToString() == "Gerente"))
            {
                return Redirect("/login/sempermissao");
            }
            else
            {
                return View();
            }
        }

        #endregion

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var login = repository.ObterTodos();
            var resultado = new { data = login };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Inserir(MovimentacaoFinanceiraEntrada movimentacaoFinaceiraEntrada)
        {
            movimentacaoFinaceiraEntrada.RegistroAtivo = true;
            var id = repository.Inserir(movimentacaoFinaceiraEntrada);
            var resultado = new { id = id };
            return Json(resultado);
        }

        [HttpGet]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult Update(MovimentacaoFinanceiraEntrada movimentacaoFinanceiraEntrada)
        {
            var alterou = repository.Alterar(movimentacaoFinanceiraEntrada);
            var resultado = new { status = alterou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }


        [HttpGet, Route("login/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        //[HttpGet, Route("movimentacaoFinanceiraEntrada/obtertodosselect2")]
        //public JsonResult ObterTodosSelect2(string term)
        //{
        //    var movimentacaoFinanceiraEntrada = repository.ObterTodos();

        //    List<object> movimentacaoFinanceiraEntradaSelect2 =
        //        new List<object>();
        //    foreach (MovimentacaoFinanceiraEntrada movimentacaoFinanceiraEntrada in movimentacaoFinanceiraEntradaSelect2)
        //    {
        //        movimentacaoFinanceiraEntradaSelect2.Add(new
        //        {
                
        //        });
        //    }
        //    var resultado = new
        //    {
        //        results = movimentacaoFinanceiraEntradaSelect2
        //    };
        //    return Json(resultado,
        //        JsonRequestBehavior.AllowGet);

        //}
    }
}