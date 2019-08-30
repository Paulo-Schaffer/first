using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class MovimentacaoFinanceiraEntradaController : Controller
    {
        private LoginRepository repository;
        
        public LoginController()
        {
            repository = new LoginRepository();
        }

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
        public JsonResult Inserir(Login login)
        {
            login.RegistroAtivo = true;
            var id = repository.Inserir(login);
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
        public JsonResult Update(Login login)
        {
            var alterou = repository.Alterar(login);
            var resultado = new { status = alterou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }


        [HttpGet, Route("login/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("login/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var logins = repository.ObterTodos();

            List<object> loginsSelect2 =
                new List<object>();
            foreach (Login login in logins)
            {
                loginsSelect2.Add(new
                {
                    id = login.Id,
                    usuario = login.Usuario,
                    senha = login.Senha,
                    idFuncionario = login.IdFuncionario
                });
            }
            var resultado = new
            {
                results = loginsSelect2
            };
            return Json(resultado,
                JsonRequestBehavior.AllowGet);

        }
    }
}