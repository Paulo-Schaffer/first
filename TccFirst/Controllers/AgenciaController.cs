using System.Collections.Generic;
using System.Web.Mvc;
using Model;
using Repository.Repositories;

namespace TccFirst.Controllers
{
    public class AgenciaController : Controller
    {

        private AgenciaRepository repository;

        public int ConvertToInt32 { get; private set; }

        public AgenciaController()
        {
            repository = new AgenciaRepository();
        }

<<<<<<< HEAD

=======
>>>>>>> parent of e88d3cd... Merge remote-tracking branch 'origin/JoaoPstein' into Paulo
        [HttpGet]
        public ActionResult Index() 
        {
            AgenciaRepository repositoryAgencia = new AgenciaRepository();
            ViewBag.Agencias = repositoryAgencia.ObterTodos();
            return View();
        }

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var agencias = repository.ObterTodos();
            var resultado = new { data = agencias };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }

        #region cadastro
        [HttpGet]
        public ActionResult Cadastro()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Cadastro(Agencia agencia)
        {
            agencia.RegistroAtivo = true;
            var id = repository.Inserir(agencia);
            var resultado = new { id = id };
            return RedirectToAction("Editar", new { id = id });
        }
        #endregion

        [HttpGet,Route("apagar")]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost, Route("editar")]
        public JsonResult Editar(Agencia agencia)
        {
            var alterou = repository.Alterar(agencia);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

        [HttpGet]
        public ActionResult Editar(int id)
        {
            var agencia = repository.ObterPeloId(id);
            ViewBag.Agencia = agencia;
            return View();
        }

<<<<<<< HEAD
        [HttpGet, Route("agencia/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string termo)
=======
        [HttpGet, Route("agencia/obtertodosselect")]
        public JsonResult ObterTodosSelect(string termo)
>>>>>>> parent of 9527b3e... Merge remote-tracking branch 'origin/Paulo' into JoaoPstein
        {
            var agencias = repository.ObterTodos();
            List<object> ObterTodosSelect2 = new List<object>();
            foreach (Agencia agencia in agencias)
            {
                ObterTodosSelect2.Add(new
                {
                    id = agencia.Id,
                    text = agencia.NomeAgencia,
                });
            }
            var resultado = new
            {
                results = ObterTodosSelect2
            };
            return Json(resultado, JsonRequestBehavior.AllowGet);

        }







    }


}




