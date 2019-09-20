using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class ParcelasPagarController : BaseController
    {
        public ParcelaPagarRepository repository;

        public ParcelasPagarController()
        {
            repository = new ParcelaPagarRepository();
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

        public ActionResult Index()
        {
            ParcelaPagarRepository repositoryParcelaPagar = new ParcelaPagarRepository();
            ViewBag.ParcelaPagar = repositoryParcelaPagar.ObterTodos();
            return View();
        }

        #region obtertodos
        [HttpGet]
        public JsonResult ObterTodos()
        {
            var parcelaspagar = repository.ObterTodos();
            var resultado = new { data = parcelaspagar };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region cadastro
        [HttpGet, Route("Index")]
        public ActionResult Cadastro()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Cadastro(ParcelaPagar parcelaPagar)
        {
            parcelaPagar.RegistroAtivo = true;
            var id = repository.Inserir(parcelaPagar);
            var resultado = new { id = id };
            return RedirectToAction("Index", new { id = id });
        }
        #endregion

        #region Apagar 
        [HttpGet, Route("apagar")]
        public ActionResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return RedirectToAction("Index", new { id = id });
        }

        #endregion

        #region editar

        [HttpPost, Route("editar")]
        public ActionResult Editar(ParcelaPagar parcelaPagar)
        {
            var alterou = repository.Alterar(parcelaPagar);
            var resultado = new { status = alterou };
            return RedirectToAction("Index", new { id = resultado });

        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            var parcelaPagar = repository.ObterPeloId(id);
            ViewBag.ParcelaPagar = parcelaPagar;
            return View();
        }
        #endregion

        #region obtertodosselect2

        [HttpGet, Route("parcelaPagar/obtertodosselect")]
        public JsonResult ObterTodosSelect(string termo)
        {
            var parcelaPagar = repository.ObterTodos();
            List<object> parcelaPagarSelect = new List<object>();
            foreach (ParcelaPagar parcelasPagar in parcelaPagar)
            {
                parcelaPagarSelect.Add(new
                {
                    id = parcelasPagar.Id,
                    valor = parcelasPagar.Valor,
                    status = parcelasPagar.Status,
                    dataPagamento = parcelasPagar.DataPagamento,
                    dataVencimento  = parcelasPagar.DataVencimento
                });
            }
            var resultado = new
            {
                resultados = parcelaPagarSelect
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }
        #endregion
    }
}