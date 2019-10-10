using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class DashboardController : BaseController
    {
        // GET: Dashboard
        public ActionResult Index()
        {
            TituloReceberRepository tituloReceberRepository = new TituloReceberRepository();
            decimal totalReceber = tituloReceberRepository.ObterTodos().Sum(x => x.ValorTotal);

            TituloPagarRepository tituloPagarRepository = new TituloPagarRepository();
            decimal totalPagar = tituloPagarRepository.ObterTodos().Sum(x => x.ValorTotal);

            ViewBag.ContasPagar = Convert.ToString(totalPagar).Replace(",", ".");
            ViewBag.ContasReceber = Convert.ToString(totalReceber).Replace(",", ".");

            var saldo = (totalReceber-totalPagar);

            ViewBag.Saldo = saldo;

            CaixaRepository caixaRepositorySaida = new CaixaRepository();
            decimal operacaoSaida = caixaRepositorySaida.ObterTodos().Where(w => w.Operacao =="Saída").Sum(x=> x.Valor);

            ViewBag.Saida = operacaoSaida;

            CaixaRepository caixaRepositoryEntrada = new CaixaRepository();
            decimal operacaoEntrada = caixaRepositoryEntrada.ObterTodos().Where(w => w.Operacao == "Entrada").Sum(x => x.Valor);

            ViewBag.Entrada = operacaoEntrada;

            TituloPagarRepository tituloPagarData = new TituloPagarRepository();
            decimal data = tituloPagarData.ObterTodos().Where(w => w.DataVencimento == DateTime.Now).Sum(x => x.ValorTotal);

            ViewBag.Data = data;

            return View();

        }
        public ActionResult Colaboradores()
        {
            return View(); 
        }



    }

}