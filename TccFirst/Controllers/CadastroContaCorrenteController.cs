﻿using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
            return RedirectToAction("Editar", new { id = id });
        }

        [HttpPost, Route("editar")]
        public JsonResult Editar(CadastroContaCorrente cadastroContaCorrente)
        {
            var alterou = repository.Alterar(cadastroContaCorrente);
            var resultado = new { status = alterou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

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


        [HttpGet, Route("cadastrocontacorrente/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string termo)
        {
            var agencias = repository.ObterTodos(0);
            List<object> ObterTodosSelect2 = new List<object>();
            foreach (CadastroContaCorrente cadastroContaCorrente in agencias)
            {
                ObterTodosSelect2.Add(new
                {
                    id = cadastroContaCorrente.Id,
                    text = cadastroContaCorrente.NumeroConta,
                    idconta = cadastroContaCorrente.IdAgencia,
                });
            }
            var resultado = new
            {
                results = ObterTodosSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Cadastro()
        {
            return View();
        }
    }
}