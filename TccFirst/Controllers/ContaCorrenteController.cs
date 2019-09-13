using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class ContaCorrenteController : Controller
    {
        private ContaCorrenteRepository repository;

        public ContaCorrenteController()
        {
            repository = new ContaCorrenteRepository();
        }

        [HttpGet]
        public ActionResult Index()
        {
            
            ContaCorrenteRepository repositoryContaCorrente = new ContaCorrenteRepository();
            ViewBag.ContaCorrentes = repositoryContaCorrente.ObterTodos();
            return View();
        }

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var contaCorrente = repository.ObterTodos();
            var resultado = new { data = contaCorrente };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        #region cadastro
        [HttpGet,Route("Index")]
        public ActionResult Cadastro()
        {
            CadastroContaCorrenteRepository cadastroContaCorrenteRepository = new CadastroContaCorrenteRepository();
            ViewBag.CadastroContaCorrentes = cadastroContaCorrenteRepository.ObterTodos();

            HistoricoRepository historicoRepository = new HistoricoRepository();
            ViewBag.Historicos = historicoRepository.ObterTodos(); 

            CategoriaDespesaRepository categoriaDespesaRepository = new CategoriaDespesaRepository();
            ViewBag.CategoriasDespesa = categoriaDespesaRepository.ObterTodos();

            CategoriaReceitaRepository categoriaReceitaRepository = new CategoriaReceitaRepository();
            ViewBag.CategoriasReceita = categoriaReceitaRepository.ObterTodos(); 


            return View();
        }
        [HttpPost]
        public ActionResult Cadastro(ContaCorrente contaCorrente)
        {
            contaCorrente.RegistroAtivo = true;
            var id = repository.Inserir(contaCorrente);
            var resultado = new { id = id };
            return RedirectToAction("Index", new { id = id });
        }
        #endregion

        [HttpGet, Route("apagar")]
        public ActionResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return RedirectToAction("Index", new { id = id });
        }

        [HttpPost]
        public JsonResult Editar(ContaCorrente contaCorrente)
        {
            var alterou = repository.Alterar(contaCorrente);
            var resultado = new { status = alterou };
            return Json(resultado);
        }


        [HttpGet]
        public ActionResult Editar(int id)
        {
            var contaCorrente = repository.ObterPeloId(id);
            ViewBag.ContaCorrentes = contaCorrente;
            return View();
        }


        [HttpGet, Route("contacorrente/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var contasCorrente = repository.ObterTodos();
            List<object> contaCorrenteSelect2 = new List<object>();
            foreach (ContaCorrente contaCorrente in contasCorrente)
            {
                contaCorrenteSelect2.Add(new
                {
                    id = contaCorrente.Id,
                    text = contaCorrente.Documento
                });
            }
            var resultado = new
            {
                results = contaCorrenteSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);



        }

    }
}