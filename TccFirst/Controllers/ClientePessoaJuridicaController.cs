using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class ClientePessoaJuridicaController : Controller
    {
        private ClientePessoaJuridicaRepository repository;

        public ClientePessoaJuridicaController()
        {
            repository = new ClientePessoaJuridicaRepository();
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        
        [HttpGet]
        public JsonResult ObterTodos()
        {
            var clientePessoaJuridica = repository.ObterTodos();
            var resultado = new { data = clientePessoaJuridica };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Inserir(ClientePessoaJuridica clientePessoaJuridica)
        {
            clientePessoaJuridica.RegistroAtivo = true;
            var id = repository.Inserir(clientePessoaJuridica);
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
        public JsonResult Update(ClientePessoaJuridica clientePessoaJuridica)
        {
            var alterou = repository.Alterar(clientePessoaJuridica);
            var resultado = new { status = alterou };
            return Json(resultado);
        }
        [HttpGet, Route("clientepessoajuridica/obterpeloid")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("clientepessoajuridica/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var clientePessoaJuridicas = repository.ObterTodos();

            List<object> clientePessoaJuridicaSelect2 =
                new List<object>();
            foreach (ClientePessoaJuridica clientePessoaJuridica in clientePessoaJuridicas)
            {
                clientePessoaJuridicaSelect2.Add(new
                {
                    
                });
            }
            var resultado = new
            {
                results = clientePessoaJuridicaSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
    }
}