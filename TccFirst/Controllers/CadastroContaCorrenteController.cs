using Model;
using Repository.Repositories;
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
        [HttpGet, Route("cadastroContaCorrente")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("obtertodos")]
        public JsonResult ObterTodos()
        {
            var cadastroContaCorrente = repository.ObterTodos();
            var resultado = new { data = cadastroContaCorrente };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Inserir(CadastroContaCorrente cadastroContaCorrente)
        {
            cadastroContaCorrente.RegistroAtivo = true;
            var id = repository.Inserir(cadastroContaCorrente);
            var resultado = new { id = id };
            return Json(resultado);
        }

        [HttpPost, Route("cadastro")]
        public ActionResult Cadastro(CadastroContaCorrente cadastroContaCorrente)
        {
            cadastroContaCorrente.RegistroAtivo = true;
            int id = repository.Inserir(cadastroContaCorrente);
            var resultado = new { id = id };
            return RedirectToAction("Index", resultado);
        }

        [HttpPost]
        public JsonResult Update(CadastroContaCorrente cadastroContaCorrente)
        {
            var alterou = repository.Alterar(cadastroContaCorrente);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

        [HttpGet, Route("apagar")]
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

        [HttpGet, Route("Index")]
        public ActionResult Cadastro()
        {
            return View();
        }
    }
}