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
            context.logins.Add(login);
            context.SaveChanges();
            return login.Id;
        }

        public Login ObterPeloId(int id)
        {
            return context.logins.FirstOrDefault(x => x.Id == id);
        }

        public List<Login> ObterTodos()
        {
            return context.logins.Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();
        }

    }
}
