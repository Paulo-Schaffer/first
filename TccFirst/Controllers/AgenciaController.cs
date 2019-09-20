using System.Collections.Generic;
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

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var agencias = repository.ObterTodos();
            var resultado = new { data = agencias };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }

        #region cadastro
        [HttpGet]
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
            return RedirectToAction("Editar", new { id = id });
        }
        #endregion

        [HttpGet,Route("apagar")]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost, Route("editar")]
        public JsonResult Editar(Agencia agencia)
        {
            var alterou = repository.Alterar(agencia);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            var agencia = repository.ObterPeloId(id);
            ViewBag.Agencia = agencia;
            return View();
        }

        [HttpGet, Route("agencia/obtertodosselect")]
        public JsonResult ObterTodosSelect(string termo)
        {
            var agencias = repository.ObterTodos();
            List<object> ObterTodosSelect2 = new List<object>();
            foreach (Agencia agencia in agencias)
            {
                ObterTodosSelect2.Add(new
                {
                    id = agencia.Id,
                    text = agencia.NomeAgencia,
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




