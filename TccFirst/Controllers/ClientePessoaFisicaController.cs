        using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class ClientePessoaFisicaController : Controller
    {
        private ClientePessoaFisicaRepository repository;

        public ClientePessoaFisicaController()
        {
            repository = new ClientePessoaFisicaRepository();
        }
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ObterTodos()
        {
            var clientePessoaFisicas = repository.ObterTodos();
            var resultado = new { data = clientePessoaFisicas };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Inserir(ClientePessoaFisica clientePessoaFisica)
        {
            clientePessoaFisica.RegistroAtivo = true;
            var id = repository.Inserir(clientePessoaFisica);
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
        public JsonResult Update(ClientePessoaFisica clientePessoaFisica)
        {
            var alterou = repository.Alterar(clientePessoaFisica);
            var resultado = new { status = alterou };
            return Json(resultado);
        }
        [HttpGet, Route("clientepessoafisica")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("clientepessoafisica/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var clientePessoaFisicas = repository.ObterTodos();

            List<object> clientesPessoasFisicasSelect2 =
                new List<object>();
            foreach (ClientePessoaFisica clientePessoaFisica in clientePessoaFisicas)
            {
                clientesPessoasFisicasSelect2.Add(new
                {
                    id = clientePessoaFisica.Id,
                    text = clientePessoaFisica.Nome
                    
                });
            }
            var resultado = new
            {
                results = clientesPessoasFisicasSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

    }
}