﻿using System.Collections.Generic;
using System.Web.Mvc;
using Model;
using Repository.Repositories;

namespace TccFirst.Controllers
{
    public class AgenciaController : BaseController
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

        #region obtertodos

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var agencias = repository.ObterTodos();
            var resultado = new { data = agencias };
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
        public ActionResult Cadastro(Agencia agencia)
        {
            agencia.RegistroAtivo = true;
            var id = repository.Inserir(agencia);
            var resultado = new { id = id };
            return RedirectToAction("Index", new { id = id });
        }
        #endregion

        #region apagar

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
        public ActionResult Editar(Agencia agencia)
        {
           var alterou = repository.Alterar(agencia);
            var resultado = new { status = alterou };
            return RedirectToAction("Index", new { id = resultado });

        }
        public ActionResult Editar(int id)
        {
            var agencia = repository.ObterPeloId(id);
            ViewBag.Agencia = agencia;
            return View();
        }
        [HttpGet, Route("agencia")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        #endregion
        [HttpPost]
        public JsonResult Update (Agencia agencia)
        {
            var alterou = repository.Alterar(agencia);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

        #region obtertodosselect2

        [HttpGet, Route("agencia/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string termo)
        {
            var agencias = repository.ObterTodos();
            List<object> ObterTodosSelect2 = new List<object>();
            foreach (Agencia agencia in agencias)
            {
                ObterTodosSelect2.Add(new
                {
                    id = agencia.Id,
                    text = agencia.NomeAgencia,
                });
            }
            var resultado = new
            {
                results = ObterTodosSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }
        #endregion







    }


}