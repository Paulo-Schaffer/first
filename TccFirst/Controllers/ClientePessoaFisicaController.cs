using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class ClientePessoaFisicaController : Controller
    {
        private ClientePessoaFisicaRepository repository;

        public ClientePessoaFisicaController()
        {
            repository = new ClientePessoaFisicaRepository();
        }
        public ActionResult Index()
        {
            return View();
        }
    }
}