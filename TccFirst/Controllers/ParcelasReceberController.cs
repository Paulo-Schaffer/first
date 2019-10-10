using Model;
using Repository.Repositories;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class ParcelasReceberController : BaseController
    {
        public ParcelaReceberRepository repository;

        public ParcelasReceberController()
        {
            repository = new ParcelaReceberRepository();
        }

        [HttpGet]
        public JsonResult ObterTodos(int idTituloReceber)
        {
            var parcelasreceber = repository.ObterTodos(idTituloReceber);
            var resultado = new { data = parcelasreceber };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Inserir(ParcelaReceber parcelaReceber)
        {
            parcelaReceber.RegistroAtivo = true;
            var id = repository.Inserir(parcelaReceber);
            var resultado = new { id = id };
            return Json(resultado);
        }
        [HttpGet]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado);
        }
        [HttpPost]
        public JsonResult Update(ParcelaReceber parcelaReceber)
        {
            var alterou = repository.Alterar(parcelaReceber);
            var resultado = new { status = alterou };
            return Json(resultado);
        }
        [HttpGet, Route("parcelasReceber/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GerarParcelas(int idTituloReceber)
        {
            repository.GerarParcelas(idTituloReceber);
            return Json(idTituloReceber, JsonRequestBehavior.AllowGet);
        }
    }
}
