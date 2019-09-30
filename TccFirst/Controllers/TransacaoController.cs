using Model;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class TransacaoController : Controller
    {
        private TransacoesRepository repository;

        public TransacaoController()
        {
            repository = new TransacoesRepository();
        }

        [HttpGet]
        public ActionResult Index()
        {

            TransacoesRepository transacoesRepository = new TransacoesRepository();
            ViewBag.Transacoes = transacoesRepository.ObterTodos();
            return View();
        }

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var transacao = repository.ObterTodos();
            var resultado = new { data = transacao };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        #region cadastro
        [HttpGet, Route("Index")]
        public ActionResult Cadastro()
        {
            CadastroContaCorrenteRepository cadastroContaCorrenteRepository = new CadastroContaCorrenteRepository();
            ViewBag.CadastroContaCorrentes = cadastroContaCorrenteRepository.ObterTodos(0);

            HistoricoRepository historicoRepository = new HistoricoRepository();
            ViewBag.Historicos = historicoRepository.ObterTodos();

            CategoriaDespesaRepository categoriaDespesaRepository = new CategoriaDespesaRepository();
            ViewBag.CategoriasDespesa = categoriaDespesaRepository.ObterTodos();

            CategoriaReceitaRepository categoriaReceitaRepository = new CategoriaReceitaRepository();
            ViewBag.CategoriasReceita = categoriaReceitaRepository.ObterTodos();


            return View();
        }
        [HttpPost]
        public ActionResult Cadastro(Transacao transacao)
        {
            transacao.RegistroAtivo = true;
            var id = repository.Inserir(transacao);
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

        [HttpPost, Route("editar")]
        public ActionResult Editar(Transacao transacao)
        {
            var alterou = repository.Alterar(transacao);
            var resultado = new { status = alterou };
            return RedirectToAction("Index", new { id = resultado });
        }


        [HttpGet]
        public ActionResult Editar(int id)
        {
            var transacao = repository.ObterPeloId(id);
            ViewBag.Transacoes = transacao;
            return View();
        }

    }

}