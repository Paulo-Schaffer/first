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
        private TransacoesRepository repository;

        public ContaCorrenteController()
        {
            repository = new TransacoesRepository();
        }

        #region Verificações Login
        private bool VerificaLogado()
        {
            if (Session["usuarioLogadoTipoFuncionario"] == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        private ActionResult VerificaPermisssao()
        {
            if (VerificaLogado() == false)
            {
                return Redirect("/login");
            }

            if ((Session["usuarioLogadoTipoFuncionario"].ToString() == "Funcionario") || (Session["usuarioLogadoTipoFuncionario"].ToString() == "Gerente"))
            {
                return Redirect("/login/sempermissao");
            }
            else
            {
                return View();
            }
        }

        #endregion


        [HttpGet]
        public ActionResult Index()
        {

            TransacoesRepository repositoryContaCorrente = new TransacoesRepository();
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
        public JsonResult Editar(Transacao transacao)
        {
            var alterou = repository.Alterar(transacao);
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
            var transacaos = repository.ObterTodos();
            List<object> contaCorrenteSelect2 = new List<object>();
            foreach (Transacao transacao in transacaos)
            {
                contaCorrenteSelect2.Add(new
                {
                    id = transacao.Id,
                    text = transacao.Documento
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