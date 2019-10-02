using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class RelatorioController : BaseController
    {
        private CaixaRepository caixaRepository;
        private TransacoesRepository transacaoRepository;

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


        public RelatorioController()
        {
            caixaRepository = new CaixaRepository();
            transacaoRepository = new TransacoesRepository();
        }


        // GET: Relatorio
        public ActionResult Index()
        {
            return View();
        }

        // GET: Relatorio
        public ActionResult FluxoCaixa()
        {
            return View();
        }
        public ActionResult RelatorioCaixa()
        {
            return View();
        }

        public ActionResult RelatorioTransacao()
        {
            return View();
        }

        [HttpGet]
        public JsonResult FluxoCaixaDados(DateTime dataInicial, DateTime dataFinal)
        {
            var dadosCaixa = caixaRepository.ObterDadosSumarizados(dataInicial, dataFinal);
            var dadosTransacao = transacaoRepository.ObterDadosSumarizados(dataInicial, dataFinal);

            List<Dados> retorno = new List<Dados>();
            double quantidade = (dataFinal - dataInicial).TotalDays;

            for (int i = 0; i < quantidade; i++)
            {
                DateTime data = dataInicial.AddDays(i);
                retorno.Add(new Dados()
                {
                    Caixa = 0,
                    Transacao = 0,
                    Data = data
                });
            }

            foreach (var caixa in dadosCaixa)
            {
                foreach (var dado in retorno)
                {
                    if (caixa.DataOriginal.Date == dado.Data.Date)
                    {
                        dado.Caixa = caixa.Valor;
                    }
                }
            }

            foreach (var transacao in dadosTransacao)
            {
                foreach (var dado in retorno)
                {
                    if (transacao.DataOriginal.Date == dado.Data.Date)
                    {
                        dado.Transacao = transacao.Valor;
                    }
                }
            }

            return Json(retorno, JsonRequestBehavior.AllowGet);
        }
    }

    public class Dados
    {
        public DateTime Data { get; set; }
        public decimal Caixa { get; set; }
        public decimal Transacao { get; set; }
        public string DataCompleta
        {
            get
            {
                return Data.ToString("dd/MM/yyyy");
            }
        }
    }
}