
using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class ContaCorrenteController : Controller
    {
        private ContaCorrenteRepository repository;

        public ContaCorrenteController()
        {
            repository = new ContaCorrenteRepository();
        }

        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ObterTodos()
        {
            var contasCorrentes = repository.ObterTodos();
            var resultado = new { data = contasCorrentes };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Inserir(ContaCorrente contaCorrente)
        {
            contaCorrente.RegistroAtivo = true;
            var id = repository.Inserir(contaCorrente);
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
        public JsonResult Update(ContaCorrente contaCorrente)
        {
            var alterou = repository.Alterar(contaCorrente);
            var resultado = new { status = alterou };
            return Json(resultado);
        }
        [HttpGet, Route("contacorrente/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloid(id), JsonRequestBehavior.AllowGet);
        }
        [HttpGet, Route("contacorrente/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var contasCorrentes = repository.ObterTodos();
            List<object> contasConrrentesSelect2 =
                new List<object>();
            foreach (ContaCorrente contaCorrente in contasCorrentes)
            {
                contasConrrentesSelect2.Add(new
                {
                    id = contaCorrente.Id,
                    idHistorico = contaCorrente.IdHistorico,
                    idCategoriaDespesa = contaCorrente.IdCategoriaDespesa,
                    idCategoriaReceita = contaCorrente.IdCategoriaReceita,
                    idAgencia = contaCorrente.IdAgencia,
                    numeroConta = contaCorrente.NumeroConta,
                    descricao = contaCorrente.Descricao,
                    documento = contaCorrente.Documento,
                    tipoReceitaDespesa = contaCorrente.TipoReceitaDespesa,
                    tipoPagamento = contaCorrente.TipoPagamento,
                    valor = contaCorrente.Valor,
                    status = contaCorrente.Status,
                    dataLancamento = contaCorrente.DataLancamento,
                    dataVencimento = contaCorrente.DataVencimento,
                    dataRecebimento = contaCorrente.DataRecebimento,
                    nomeBanco = contaCorrente.NomeBanco,
                    numeroBanco = contaCorrente.NumeroBanco
                });
            }
            var resultado = new
            {
                results = contasConrrentesSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
    }
}