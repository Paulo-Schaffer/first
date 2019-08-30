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
            throw new NotImplementedException();
        }

        public bool Apagar(int id)
        {
            throw new NotImplementedException();
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
            return context.Logins.FirstOrDefault(x => x.Id == id);
        }

        public List<Login> ObterTodos()
        {
            return context.Logins.Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();
        }

    }
}
