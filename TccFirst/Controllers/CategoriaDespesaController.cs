using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class CategoriaDespesaController : BaseController
    {
        private CategoriaDespesaRepository repository;

        public CategoriaDespesaController()
        {
            repository = new CategoriaDespesaRepository();
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
            return View();
        }

        [HttpPost]
        public JsonResult Inserir(CategoriaDespesa categoriaDespesa)
        {
            categoriaDespesa.RegistroAtivo = true;
            var id = repository.Inserir(categoriaDespesa);
            var resultado = new { id = id };
            return Json(resultado);
        }

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var categorias = repository.ObterTodos();
            var resultado = new { data = categorias };
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
        public JsonResult Updtate (CategoriaDespesa categoriaDespesa)
        {
            var alterou = repository.Alterar(categoriaDespesa);
            var resultado = new { status = alterou };
            return Json(resultado);   
        }

        [HttpGet, Route("categoriadespesa/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var categorias = repository.ObterTodos();
            List<object> categoriasSelect2 = new List<object>();
            foreach (CategoriaDespesa categoriaDespesa in categorias)
            {
                categoriasSelect2.Add(new
                {
                    id = categoriaDespesa.Id,
                    text = categoriaDespesa.TipoCategoriaDespesa
                });
            }
            var resultado = new { results = categoriasSelect2 };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
    }
}