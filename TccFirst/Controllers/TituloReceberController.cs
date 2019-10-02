using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class TituloReceberController : BaseController
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

        [HttpGet, Route("apagar")]
        public ActionResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return RedirectToAction("Index", new { id = id });
        }

        #region Cadastro
        [HttpGet, Route("Index")]
        public ActionResult Cadastro()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Cadastro(TituloReceber tituloReceber)
        {
            tituloReceber.RegistroAtivo = true;
            tituloReceber.Status = TituloReceber.StatusPendente;
            int id = repository.Inserir(tituloReceber);
            var resultado = new { id = id };
            return RedirectToAction("Index", resultado);
        }
        #endregion

        #region Editar
        [HttpPost, Route("editar")]
        public ActionResult Editar(TituloReceber tituloReceber)
        {
            var alterou = repository.Alterar(tituloReceber);
            var resultado = new { status = alterou };
            return RedirectToAction("Index", new { id = resultado });
        }

        public ActionResult Editar(int id)
        {
            var tituloReceber = repository.ObterPeloId(id);
            ViewBag.TituloReceber = tituloReceber;
            return View();
        }
        #endregion

        public ActionResult Index()
        {
            TituloReceberRepository tituloReceberRepository = new TituloReceberRepository();
            ViewBag.TitulosReceber = tituloReceberRepository.ObterTodos();
            return View();
        }

        [HttpGet, Route("tituloReceber/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var titulosReceber = repository.ObterTodos();
            List<object> tituloRecebersSelect2 =
                 new List<object>();
            foreach (TituloReceber tituloReceber in titulosReceber)
            {
                tituloRecebersSelect2.Add(new
                {
                    id = tituloReceber.Id,
                    text = tituloReceber.Descricao,
                });
            }
            var resultado = new
            {
                results = tituloRecebersSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }
    }
    //[HttpGet, Route("tituloreceber")]
    //public JsonResult ObterPeloId(int id)
    //{
    //    return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
    //}
}