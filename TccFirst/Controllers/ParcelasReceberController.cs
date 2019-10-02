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


        public ParcelasReceberController()
        {
            repository = new ParcelaReceberRepository();
        }

        //public ActionResult Index()
        //{
        //    //return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        //}

        [HttpGet]
        public JsonResult ObterTodos(int idTituloReceber)
        {
            var parcelasreceber = repository.ObterTodos(idTituloReceber);
            var resultado = new { data = parcelasreceber };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

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
        [HttpGet, Route("parcelasReceber/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GerarParcelas(int idTituloReceber)
        {

            repository.GerarParcelas(idTituloReceber);
            return Json(idTituloReceber, JsonRequestBehavior.AllowGet);

        }
    }
}
