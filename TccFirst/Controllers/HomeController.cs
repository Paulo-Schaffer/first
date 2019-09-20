using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class HomeController : BaseController
    {
        // GET: Home
        public ActionResult Index()
        {
            //int tituloPagarOficial = 21;
            TituloReceberRepository tituloReceberRepository = new TituloReceberRepository();
            decimal totalReceber = tituloReceberRepository.ObterTodos().Sum(x => x.ValorTotal);

            TituloPagarRepository tituloPagarRepository = new TituloPagarRepository();
            decimal totalPagar = tituloPagarRepository.ObterTodos().Sum(x => x.ValorTotal);

            ViewBag.ContasPagar = Convert.ToString(totalReceber).Replace(",", ".");
            ViewBag.ContasReceber = Convert.ToString(totalPagar).Replace(",", ".");


            return View();
        }
    }
}