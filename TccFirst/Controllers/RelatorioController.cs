using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class RelatorioController : BaseController
    {
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
    }
}