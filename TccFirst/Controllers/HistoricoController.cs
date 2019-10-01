using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class HistoricoController : BaseController
    {
        private HistoricoRepository repository;

        public int ConvertToInt32 { get; private set; }

        public HistoricoController()
        {
            repository = new HistoricoRepository();
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

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ObterTodos()
        {
            var historico = repository.ObterTodos();
            var resultado = new { data = historico };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Inserir(Historico historico)
        {
            historico.RegistroAtivo = true;
            var id = repository.Inserir(historico);
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
        public JsonResult Update(Historico historico)
        {
            var alterou = repository.Alterar(historico);
            var resultado = new { status = alterou };
            return Json(resultado);
        }
        [HttpGet, Route("historico/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }
        [HttpGet, Route("historico/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string termo)
        {
            var historicos = repository.ObterTodos();

            List<object> ObterTodosSelect2 = new List<object>();
            foreach (Historico historico in historicos)
            {
                ObterTodosSelect2.Add(new
                {
                    id = historico.Id,
                    text = historico.Descricao


                });
            }
            var resultado = new
            {
                results = ObterTodosSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
    }
}