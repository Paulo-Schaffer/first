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
        public ActionResult Index()
        {
            return View();
        }        
        [HttpGet]
        public JsonResult ObterTodos()
        {
            var clientePessoaJuridicas = repository.ObterTodos();
            var resultado = new { data = clientePessoaJuridicas };
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

        [HttpPost]
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
        [HttpGet, Route("clientepessoajuridica")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("clientePessoaJuridica/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var clientePessoaJuridicas = repository.ObterTodos();

            List<object> clientePessoaJuridicasSelect2 =
                new List<object>();
            foreach (ClientePessoaJuridica clientePessoaJuridica in clientePessoaJuridicas)
            {
                clientePessoaJuridicasSelect2.Add(new
                {
                    id=clientePessoaJuridica.Id,
                    razaoSocial=clientePessoaJuridica.RazaoSocial,
                    atividade=clientePessoaJuridica.Atividade,
                    nomeFantasia=clientePessoaJuridica.NomeFantasia,
                    dataCadastro=clientePessoaJuridica.DataCadastro,
                    cnpj=clientePessoaJuridica.Cnpj,
                    email=clientePessoaJuridica.Email,
                    filial=clientePessoaJuridica.Filial,
                    telefone=clientePessoaJuridica.Telefone,
                    cep=clientePessoaJuridica.Cep,
                    logradouro=clientePessoaJuridica.Logradouro,
                    numero=clientePessoaJuridica.Numero,
                    bairro=clientePessoaJuridica.Bairro,
                    uf=clientePessoaJuridica.Uf,
                    cidade=clientePessoaJuridica.Cidade

                });
            }
            var resultado = new
            {
                results = clientePessoaJuridicasSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
    }
}