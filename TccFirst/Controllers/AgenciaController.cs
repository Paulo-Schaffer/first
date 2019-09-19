using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using Repository.Repositories;

namespace TccFirst.Controllers
{
    public class AgenciaController : BaseController
    {

        private AgenciaRepository repository;

        public int ConvertToInt32 { get; private set; }

        public AgenciaController()
        {
            repository = new AgenciaRepository();
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
            AgenciaRepository repositoryAgencia = new AgenciaRepository();
            ViewBag.Agencias = repositoryAgencia.ObterTodos();
            return View();
        }

        #region obtertodos

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var agencias = repository.ObterTodos();
            var resultado = new { data = agencias };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }
        #endregion

        #region cadastro
        [HttpGet, Route("Index")]
        public ActionResult Cadastro()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Cadastro(Agencia agencia)
        {
            agencia.RegistroAtivo = true;
            var id = repository.Inserir(agencia);
            var resultado = new { id = id };
            return RedirectToAction("Index", new { id = id });
        }
        #endregion

        #region apagar

        [HttpGet, Route("apagar")]
        public ActionResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return RedirectToAction("Index", new { id = id });
        }
        #endregion

        #region editar

        [HttpPost, Route("editar")]
        public ActionResult Editar(Agencia agencia)
        {
            var alterou = repository.Alterar(agencia);
            var resultado = new { status = alterou };
            return RedirectToAction("Index", new { id = resultado });

        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            var agencia = repository.ObterPeloId(id);
            ViewBag.Agencia = agencia;
            return View();
        }
        #endregion

        #region obtertodosselect2

        [HttpGet, Route("agencia/obtertodosselect")]
        public JsonResult ObterTodosSelect(string termo)
        {
            var agencias = repository.ObterTodos();
            List<object> agenciasSelect = new List<object>();
            foreach (Agencia agencia in agencias)
            {
                agenciasSelect.Add(new
                {
                    id = agencia.Id,
                    banco = agencia.Banco,
                    nome = agencia.NomeAgencia,
                    numero = agencia.NumeroAgencia
                });
            }
            var resultado = new
            {
                resultados = agenciasSelect
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }
        #endregion







    }


}




