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
            string numeroAgencia = "";
            agencia.NumeroAgencia = numeroAgencia; 

            agencia.RegistroAtivo = true;
            var id = repository.Inserir(agencia);   




            var resultado = new { id=id };     
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
        [HttpGet]
        public ActionResult Cadastro()
        {
            return View();
        }







    }


}




