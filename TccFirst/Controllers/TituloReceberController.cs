using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    [Route("tituloreceber/")]
    public class TituloReceberController : Controller
    {
        private TituloReceberRepository repository;

        public TituloReceberController()
        {
            repository = new TituloReceberRepository();
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

        [HttpGet, Route("obterTodos")]
        public JsonResult ObterTodos()
        {
            var titulosReceber = repository.ObterTodos();
            var resultado = new { data = titulosReceber };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost, Route("cadastro")]
        public ActionResult Cadastro(TituloReceber tituloReceber)
        {
            tituloReceber.RegistroAtivo = true;
            int id = repository.Inserir(tituloReceber);
            return Json(new { id = id });
        }

        [HttpPost, Route("editar")] 
        public JsonResult Editar(TituloReceber tituloReceber)
        {
            var alterou = repository.Alterar(tituloReceber);
            var resultado = new { status = alterou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        
        [HttpGet,Route("apagar")]
        public JsonResult Apagar(int id)
        {
            
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpGet, Route("obterpeloid")]
        public ActionResult ObterPeloId(int id)
        {
            var tituloReceber = repository.ObterPeloId(id);
            if (tituloReceber == null)
                return HttpNotFound();

            return Json(tituloReceber,
                JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Cadastro()
        {
            return View();
        }
    }
}