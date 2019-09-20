using Model;
using Repository.Interfaces;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace TccFirst.Controllers
{
    public class FuncionarioController : BaseController
    {
        private FuncionarioRepository repository;

        public FuncionarioController()
        {
            repository = new FuncionarioRepository();
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
            return View();
        }

        [HttpGet]
        public ActionResult Cadastro()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ObterTodos()
        {
            var funcionario = repository.ObterTodos();
            var resultado = new { data = funcionario };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Inserir(Funcionario funcionario)
        {
            funcionario.RegistroAtivo = true;
            var id = repository.Inserir(funcionario);
            var resultado = new { id = id };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Apagar(int id)
        {
            var apagou = repository.Apagar(id);
            var resultado = new { status = apagou };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(Funcionario funcionario)
        {
            var alterou = repository.Alterar(funcionario);
            var resultado = new { status = alterou };
            return Json(resultado);
        }

        [HttpGet, Route("funcionario/")]
        public JsonResult ObterPeloId(int id)
        {
            return Json(repository.ObterPeloId(id), JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Route("funcionario/obtertodosselect2")]
        public JsonResult ObterTodosSelect2(string term)
        {
            var funcionarios = repository.ObterTodos();

            List<object> funcionariosSelect2 = new List<object>();
            foreach (Funcionario funcionario in funcionarios)
            {
                funcionariosSelect2.Add(new
                {
                    id = funcionario.Id,
                    text = funcionario.TipoFuncionario
                });
            }
            var resultado = new { results = funcionariosSelect2 };
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
<<<<<<< HEAD

        public static string SHA512(string input)
        {
            var bytes = System.Text.Encoding.UTF8.GetBytes(input);
            using (var hash = System.Security.Cryptography.SHA512.Create())
            {
                var hashedInputBytes = hash.ComputeHash(bytes);

                // Convert to text
                // StringBuilder Capacity is 128, because 512 bits / 8 bits in byte * 2 symbols for byte 
                var hashedInputStringBuilder = new System.Text.StringBuilder(128);
                foreach (var b in hashedInputBytes)
                    hashedInputStringBuilder.Append(b.ToString("X2"));
                return hashedInputStringBuilder.ToString();
            }
        }
<<<<<<< HEAD
=======
>>>>>>> parent of e88d3cd... Merge remote-tracking branch 'origin/JoaoPstein' into Paulo
=======
>>>>>>> parent of 9527b3e... Merge remote-tracking branch 'origin/Paulo' into JoaoPstein
=======
>>>>>>> parent of ee136f1... Alterações
    }
}