using Model;
using Repository.Repositories;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    [Route("movimentacaofinanceiraentrada/")]
    public class MovimentacaoFinanceiraEntradaController : BaseController
    {
        private MovimentacaoFinaceiraEntradaRepository repository;
        
        public MovimentacaoFinanceiraEntradaController()
        {
            repository = new MovimentacaoFinaceiraEntradaRepository();
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
        public JsonResult Inserir(MovimentacaoFinanceiraEntrada movimentacaoFinaceiraEntrada)
        {
            movimentacaoFinaceiraEntrada.RegistroAtivo = true;
            var id = repository.Inserir(movimentacaoFinaceiraEntrada);
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
        public JsonResult Update(MovimentacaoFinanceiraEntrada movimentacaoFinanceiraEntrada)
        {
            var alterou = repository.Alterar(movimentacaoFinanceiraEntrada);
            var resultado = new { status = alterou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("login/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }
    }
}