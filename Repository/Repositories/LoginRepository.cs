using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private SistemaContext context;

        public LoginRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(Login login)
        {
            var loginOfical = context.Logins.Where(x => x.Id == login.Id).FirstOrDefault();
            if (login == null)
            {
                return false;
            }

            loginOfical.IdFuncionario = login.IdFuncionario;
            loginOfical.Usuario = login.Usuario;
            loginOfical.Senha = login.Senha;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var login = context.Logins.FirstOrDefault(x => x.Id == id);
            if (login == null)
            {
                return false;
            }
            login.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(Login login)
        {
            login.RegistroAtivo = true;
            context.Logins.Add(login);
            context.SaveChanges();
            return login.Id;
        }

        public Login ObterPeloId(int id)
        {
            var login = context.Logins
                .Where(x => x.Id == id)
                .FirstOrDefault();
            return login;
        }

        public List<Login> ObterTodos()
        {
            return context.Logins
                .Include("Funcionario")
                .Where(x => x.RegistroAtivo == true).ToList();
        }
    }
}
