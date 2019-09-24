using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class CadastroContaCorrenteController : BaseController
    {
        private CadastroContaCorrenteRepository repository;

        public CadastroContaCorrenteController()
        {
            repository = new CadastroContaCorrenteRepository();
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

        [HttpGet, Route("obtertodos")]
        public JsonResult ObterTodos(int idAgencia = 0)
        {
            var cadastroContaCorrente = repository.ObterTodos(idAgencia);
            var resultado = new { data = cadastroContaCorrente };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost, Route("cadastro")]
        public ActionResult Cadastro(CadastroContaCorrente cadastroContaCorrente)
        {
            int id = repository.Inserir(cadastroContaCorrente);
            return Json(new { id = id });
        }

        [HttpPost, Route("alterar")]
        public JsonResult Editar(CadastroContaCorrente cadastroContaCorrente)
        {
            var alterou = repository.Alterar(cadastroContaCorrente);
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

        [HttpGet, Route("cadastrocontacorrente")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }


        [HttpGet, Route("cadastrocontacorrente/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string termo)
        {
            var agencias = repository.ObterTodos(0);
            List<object> ObterTodosSelect2 = new List<object>();
            foreach (CadastroContaCorrente cadastroContaCorrente in agencias)
            {
                ObterTodosSelect2.Add(new
                {
                    id = cadastroContaCorrente.Id,
                    text = cadastroContaCorrente.NumeroConta,
                    idconta = cadastroContaCorrente.IdAgencia,
                });
            }
            var resultado = new
            {
                results = ObterTodosSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }

        public ActionResult Index()
        {
           return View();
        }
    }
}