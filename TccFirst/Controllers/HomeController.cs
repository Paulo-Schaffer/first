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
            int tituloPagarOficial = 21;
            TituloPagarRepository x = new TituloPagarRepository;
            ViewBag.grafico = x;
            return View();
        }
    }
}