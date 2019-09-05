using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using Repository.Repositories;

namespace TccFirst.Controllers
{
    public class AgenciaController : Controller
    {

        private AgenciaRepository repository;

        public int ConvertToInt32 { get; private set; }

        public AgenciaController()
        {
            repository = new AgenciaRepository();
        }

        [HttpGet]
        public ActionResult Index() 
        {
            AgenciaRepository repositoryAgencia = new AgenciaRepository();
            ViewBag.Agencias = repositoryAgencia.ObterTodos();
            return View();
        }

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var agencias = repository.ObterTodos();
            var resultado = new { data = agencias };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }

        #region cadastro
        [HttpGet]
        public ActionResult Cadastro()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Cadastro(Agencia agencia)
        {
            agencia.RegistroAtivo = true;
            var id = repository.Inserir(agencia);
            var resultado = new { id = id };
            return RedirectToAction("Editar", new { id = id });
        }
        #endregion

        [HttpGet,Route("apagar")]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost, Route("editar")]
        public JsonResult Editar(Agencia agencia)
        {
            var alterou = repository.Alterar(agencia);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            var agencia = repository.ObterPeloId(id);
            ViewBag.Agencia = agencia;
            return View();
        }

        [HttpGet, Route("agencia/obtertodosselect")]
        public JsonResult ObterTodosSelect(string termo)
        {
            var agencias = repository.ObterTodos();
            List<object> agenciasSelect = new List<object>();
            foreach (Agencia agencia in agencias)
            {
                agenciasSelect.Add(new
                {
                    id = agencia.Id,
                    banco = agencia.Banco,
                    nome = agencia.NomeAgencia,
                    numero = agencia.NumeroAgencia
                });
            }
            var resultado = new
            {
                resultados = agenciasSelect
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }







    }


}




