using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    [Route("tituloPagar/")]
    public class TituloPagarController : Controller
    {
        private TituloPagarRepository repository;

        public TituloPagarController()
        {
            repository = new TituloPagarRepository();
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var tituloPagar = repository.ObterTodos();
            var resultado = new { data = tituloPagar };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Inserir(TituloPagar tituloPagar)
        {
            tituloPagar.RegistroAtivo = true;
            var id = repository.Inserir(tituloPagar);
            var resultado = new { id = id };
            return Json(resultado);
        }

        [HttpPost, Route("editar")]
        public JsonResult Editar(TituloPagar tituloPagar)
        {
            var alterou = repository.Alterar(tituloPagar);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

        [HttpGet]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("tituloPagar")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("tituloPagar/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var tituloPagars = repository.ObterTodos();

            List<object> tituloPagarSelect2 =
                new List<object>();
            foreach (TituloPagar tituloPagar in tituloPagars)
            {
                tituloPagarSelect2.Add(new
                {
                    id = tituloPagar.Id,
                    descricao = tituloPagar.Descricao,
                    formaPagamento = tituloPagar.FormaPagamento,
                    caixa = tituloPagar.Caixa,
                    valorTotal = tituloPagar.ValorTotal,
                    status = tituloPagar.Status,
                    dataLancamento = tituloPagar.DataLancamento,
                    dataRecebimento = tituloPagar.DataRecebimento,
                    dataVencimento = tituloPagar.DataVencimento,
                    complemento = tituloPagar.Complemento,
                    quantidadeParcela = tituloPagar.QuantidadeParcela,
                    idFornecedores = tituloPagar.IdFornecedores,
                    idCategoriaDespesas = tituloPagar.IdCategoriaDepesesas
                });
            }
            var resultado = new
            {
                results = tituloPagarSelect2
            };
            return Json(resultado,
                JsonRequestBehavior.AllowGet);

        }



    }
}