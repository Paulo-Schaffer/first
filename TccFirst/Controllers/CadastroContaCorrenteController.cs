using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class CadastroContaCorrenteController : Controller
    {
        private CadastroContaCorrenteRepository repository;

        public CadastroContaCorrenteController()
        {
            repository = new CadastroContaCorrenteRepository();
        }
        // GET: CadastroContaCorrente
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ObterTodos(string busca = "")
        {
            var cadastroContaCorrente = repository.ObterTodos(busca);
            var resultado = new { data = cadastroContaCorrente };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Inserir(CadastroContaCorrente cadastroContaCorrente)
        {
            cadastroContaCorrente.RegistroAtivo = true;
            var id = repository.Inserir(cadastroContaCorrente);
            var resultado = new { id = id };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult Update(CadastroContaCorrente cadastroContaCorrente)
        {
            var alterou = repository.Alterar(cadastroContaCorrente);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

    }
}