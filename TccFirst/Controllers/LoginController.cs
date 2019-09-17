using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    [Route("login/")]
    public class LoginController : Controller
    {
        private LoginRepository repository;

        public LoginController()
        {
            repository = new LoginRepository();
        }

        [HttpGet, Route("obtertodos")]
        public JsonResult ObterTodos()
        {
            var login = repository.ObterTodos();
            var resultado = new { data = login };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost, Route("cadastro")]
        public ActionResult Cadastro(Login login)
        {
            int id = repository.Inserir(login);
            return RedirectToAction("Editar", new { id = id });
        }

        [HttpPost, Route("editar")]
        public JsonResult Editar(Login login)
        {
            var alterou = repository.Alterar(login);
            var resultado = new { status = alterou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Cadastro()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            var login = repository.ObterPeloId(id);
            if (login == null)
                return RedirectToAction("Index");

            ViewBag.Login = login;
            return View();
        }
    }
}