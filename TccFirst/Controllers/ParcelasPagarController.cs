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
        public JsonResult ObteTodos()
        {
            var parcelaspagar = repository.ObterTodos();
            var resultado = new { data = parcelaspagar };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Inserir(ParcelaPagar parcelaPagar)
        {
            parcelaPagar.RegistroAtivo = true;
            var id = repository.Inserir(parcelaPagar);
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
        public JsonResult Update(ParcelaPagar parcelasPagar)
        {
            var alterou = repository.Alterar(parcelasPagar);
            var resultado = new { status = alterou };
            return Json(resultado);
        }
        [HttpGet, Route("parcelasPagar/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }
        //[HttpGet, Route("parcelasPagar/obtertodosselect")]
        //public JsonResult ObterTodosSelect(string termo)
        //{
        //    var parcelasPagar = repository.ObterTodos();
        //    List<object> parcelasPagarSelect = new List<object>();
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