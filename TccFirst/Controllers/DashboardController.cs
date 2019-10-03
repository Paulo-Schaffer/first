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

            return View();
        }
       
    }

}