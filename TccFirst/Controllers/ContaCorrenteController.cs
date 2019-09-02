
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

        public ActionResult Index()
        {
            return View();
        }
    }
}