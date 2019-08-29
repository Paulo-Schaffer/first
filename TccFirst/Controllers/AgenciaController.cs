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

        public AgenciaRepository repository;

        public AgenciaController()
        {
            repository = new AgenciaRepository();
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var agencias = repository.ObterTodos();
            var resultado = new { data = agencias };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult Inserir(Agencia agencia)
        {
            agencia.RegistroAtivo = true;
            var id = repository.Inserir(agencia);
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
        public JsonResult Update(Agencia agencia)
        {
            var alterou = repository.Alterar(agencia);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

        [HttpGet, Route("agencia/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }


        [HttpGet, Route("agencia/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string termo)
        {
            var agencias = repository.ObterTodos();
            List<object> agenciasSelect2 = new List<object>(); 
            foreach( Agencia agencia in agencias)
            {
                agenciasSelect2.Add(new
                {
                    id = agencia.Id,
                    nome = agencia.NomeAgencia,
                    numero = agencia.NumeroAgencia
                });
            }
                var resultado = new
                {
                    resultados = agenciasSelect2
                };
                return Json(resultado, JsonRequestBehavior.AllowGet);
        }


       


    }


}




