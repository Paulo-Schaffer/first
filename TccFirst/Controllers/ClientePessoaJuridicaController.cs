using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class ClientePessoaJuridicaController : BaseController
    {
        private ClientePessoaJuridicaRepository repository;

        public ClientePessoaJuridicaController()
        {
            repository = new ClientePessoaJuridicaRepository();
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
            var clientePessoaJuridicas = repository.ObterTodos();
            var resultado = new { data = clientePessoaJuridicas };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Inserir(ClientePessoaJuridica clientePessoaJuridica)
        {
            clientePessoaJuridica.RegistroAtivo = true;
            var id = repository.Inserir(clientePessoaJuridica);
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
        public JsonResult Update(ClientePessoaJuridica clientePessoaJuridica)
        {
            var alterou = repository.Alterar(clientePessoaJuridica);
            var resultado = new { status = alterou };
            return Json(resultado);
        }
        [HttpGet, Route("clientepessoajuridica/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("clientePessoaJuridica/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var clientePessoaJuridicas = repository.ObterTodos();

            List<object> clientePessoaJuridicasSelect2 =
                new List<object>();
            foreach (ClientePessoaJuridica clientePessoaJuridica in clientePessoaJuridicas)
            {
                clientePessoaJuridicasSelect2.Add(new
                {
                    id=clientePessoaJuridica.Id,
                    text=clientePessoaJuridica.RazaoSocial,

                });
            }
            var resultado = new
            {
                results = clientePessoaJuridicasSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
    }
}