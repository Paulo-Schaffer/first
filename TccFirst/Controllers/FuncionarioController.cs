using Model;
using Repository.Interfaces;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace TccFirst.Controllers
{
    public class FuncionarioController : Controller
    {
        private FuncionarioRepository repository;

        public FuncionarioController()
        {
            repository = new FuncionarioRepository();
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var funcionario = repository.ObterTodos();
            var resultado = new { data = funcionario };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Inserir(Funcionario funcionario)
        {
            funcionario.RegistroAtivo = true;
            var id = repository.Inserir(funcionario);
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
        public JsonResult Update(Funcionario funcionario)
        {
            var alterou = repository.Alterar(funcionario);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

        [HttpGet, Route("funcionario/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("funcionario/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var funcionarios = repository.ObterTodos();

            List<object> funcionariosSelect2 =
                new List<object>();
            foreach (Funcionario funcionario in funcionarios)
            {
                funcionariosSelect2.Add(new
                {
                    id = funcionario.Id,
                    nome = funcionario.NomeFuncionario,
                    tipoFuncionario = funcionario.TipoFuncionario
                });
            }
            var resultado = new
            {
                results = funcionariosSelect2
            };
            return Json(resultado,
                JsonRequestBehavior.AllowGet);

        }

    }
}