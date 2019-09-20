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

<<<<<<< HEAD

=======
>>>>>>> parent of e88d3cd... Merge remote-tracking branch 'origin/JoaoPstein' into Paulo
        [HttpGet, Route("obtertodos")]
        public JsonResult ObterTodos()
        {
            var cadastroContaCorrente = repository.ObterTodos();
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

<<<<<<< HEAD
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

=======
>>>>>>> parent of 9527b3e... Merge remote-tracking branch 'origin/Paulo' into JoaoPstein
        public ActionResult Index()
        {
           return View();
        }
    }
}