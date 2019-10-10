﻿using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class CategoriaReceitaController : BaseController
    {
        private CategoriaReceitaRepository repository;

        public CategoriaReceitaController()
        {
            repository = new CategoriaReceitaRepository();
        }

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var categorias = repository.ObterTodos();
            var resultado = new { data = categorias };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Inserir(CategoriaReceita categoriaReceita)    
        {
            categoriaReceita.RegistroAtivo = true;
            var id = repository.Inserir(categoriaReceita);
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

        [HttpGet, Route("categoriareceita/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Update(CategoriaReceita categoriaReceita)
        {
            var alterou = repository.Alterar(categoriaReceita);
            var resultado = new { status = alterou };
            return Json(resultado);
        }


        [HttpGet, Route("categoriareceita/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var categorias = repository.ObterTodos();

            List<object> categoriasSelect2 = new List<object>();
            foreach (CategoriaReceita categoriaReceita in categorias)
            {
                categoriasSelect2.Add(new
                {
                    id = categoriaReceita.Id,
                    text = categoriaReceita.TipoCategoriaReceita
                });
            }
            var resultado = new { results = categoriasSelect2 };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
    }
}