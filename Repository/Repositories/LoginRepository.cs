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
            try
            {
                var loginOfical = context.Logins.FirstOrDefault(x => x.Id == login.Id);
                if (login == null)
                    return false;

                loginOfical.IdFuncionario = loginOfical.IdFuncionario;
                loginOfical.Usuario = loginOfical.Usuario;
                loginOfical.Senha = loginOfical.Senha;
                int quantidadeAfetada = context.SaveChanges();
                return quantidadeAfetada == 1;
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possivel alterar");
            }
            
        }

        public bool Apagar(int id)
        {
            try
            {
                var login = context.Logins.FirstOrDefault(x => x.Id == id);
                if (login == null)
                    return false;

                login.RegistroAtivo = false;
                int quantidadeAfetada = context.SaveChanges();
                return quantidadeAfetada == 1;
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possivel apagar");
            }
        }

        public int Inserir(Login login)
        {
            try
            {
                login.RegistroAtivo = true;
                context.Logins.Add(login);
                context.SaveChanges();
                return login.Id;
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possivel inserir");
            }
        }

        public Login ObterPeloId(int id)
        {
            return context.Logins
                .Include("Login")
                .FirstOrDefault(x => x.Id == id);
        }

        public List<Login> ObterTodos()
        {
            return context.Logins
                .Where(x => x.RegistroAtivo == true)
                .OrderBy(x => x.Id).ToList();
        }

    }
}
