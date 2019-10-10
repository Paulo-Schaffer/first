﻿using Model;
using Repository.Repositories;
using System.Web;
using System.Web.Mvc;

namespace TccFirst.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult Sair()
        {
            Session["UsuarioLogadoId"] = null;
            Session["UsuarioLogadoTipoFuncionario"] = null;
            return RedirectToAction("index");
        }

        public ActionResult VerificaLogin( string usuario, string senha)
        {
            FuncionarioRepository Repository = new FuncionarioRepository();
            Funcionario funcionario = Repository.BuscarFuncionario(usuario, senha);

            if (funcionario != null)
            {
                Session["usuarioLogadoId"] = funcionario.Id;
                Session["usuarioLogadoNome"] = funcionario.NomeFuncionario;
                Session["usuarioLogadoTipoFuncionario"] = funcionario.TipoFuncionario;
                return RedirectToAction("Index", "Dashboard");
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        public ActionResult SemPermissao()
        {
            return View();
        }
    }
}