using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class FornecedorController : Controller
    {
        private FornecedorRepository repository;

        public FornecedorController()
        {
            repository = new FornecedorRepository();
        }
        // GET: Fornecedor
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ObterTodos(string busca = "")
        {
            var fornecedores = repository.ObterTodos(busca);
            var resultado = new { data = fornecedores };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Inserir(Fornecedor fornecedores)
        {
            fornecedores.RegistroAtivo = true;
            var id = repository.Inserir(fornecedores);
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
        public JsonResult Update(Fornecedor fornecedores)
        {
            var alterou = repository.Alterar(fornecedores);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

        [HttpGet, Route("fornecedor/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("fornecedor/obtertodosselect")]
        public JsonResult ObterTodosSelect(string term)
        {
            var fornecedores = repository.ObterTodos(term);

            List<Object> fornecedorSelect = new List<object>();

            foreach (Fornecedor fornecedor in fornecedores)
            {
                fornecedorSelect.Add(new
                {
                    id = fornecedor.Id,
                    text = fornecedor.RazaoSocial,
                    fantasia = fornecedor.NomeFantasia,
                    data = fornecedor.DataCadastro,
                    cnpj = fornecedor.Cnpj,
                    email = fornecedor.Email,
                    telefone = fornecedor.Telefone,
                    cep = fornecedor.Cep,
                    logradouro = fornecedor.Logradouro,
                    numero = fornecedor.Numero,
                    bairro = fornecedor.Bairro,
                    uf = fornecedor.Uf,
                    cidade = fornecedor.Cidade
                });
            }
            var resultado = new { results = fornecedorSelect };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
    }
}