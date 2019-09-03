using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class ClientePessoaFisicaRepository : IClientePessoaFisicaRepository
    {
        private SistemaContext context;
        public ClientePessoaFisicaRepository()
        {
            context = new SistemaContext();
        }
        public bool Alterar(ClientePessoaFisica clientePessoaFisica)
        {
            var clientePessoaFisicaOriginal = context.ClientesPessoasFisicas.FirstOrDefault(x => x.Id == clientePessoaFisica.Id);

            if (clientePessoaFisicaOriginal == null)
                return false;
            clientePessoaFisicaOriginal.Nome = clientePessoaFisica.Nome;
            clientePessoaFisicaOriginal.Cpf = clientePessoaFisica.Cpf;
            clientePessoaFisicaOriginal.DataNascimento = clientePessoaFisica.DataNascimento;
            clientePessoaFisicaOriginal.LimiteCredito = clientePessoaFisica.LimiteCredito;
            clientePessoaFisicaOriginal.Email = clientePessoaFisica.Email;
            clientePessoaFisicaOriginal.Telefone = clientePessoaFisica.Telefone;
            clientePessoaFisicaOriginal.Cep = clientePessoaFisica.Cep;
            clientePessoaFisicaOriginal.Numero = clientePessoaFisica.Numero;
            clientePessoaFisicaOriginal.Bairro = clientePessoaFisica.Bairro;
            clientePessoaFisicaOriginal.Cidade = clientePessoaFisica.Cidade;
            clientePessoaFisicaOriginal.Uf = clientePessoaFisica.Uf;
            clientePessoaFisicaOriginal.Complemento = clientePessoaFisica.Complemento;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var clientePessoaFisica = context.ClientesPessoasFisicas.FirstOrDefault(x => x.Id == id);
            if (clientePessoaFisica == null)
                return false;
            clientePessoaFisica.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(ClientePessoaFisica clientePessoaFisica)
        {
            context.ClientesPessoasFisicas.Add(clientePessoaFisica);
            context.SaveChanges();
            return clientePessoaFisica.Id;
        }

        public ClientePessoaFisica ObterPeloId(int id)
        {
            var clientePessoaFisica = context.ClientesPessoasFisicas.FirstOrDefault(x => x.Id == id);
            return clientePessoaFisica;
        }

        public List<ClientePessoaFisica> ObterTodos()
        {
            return context.ClientesPessoasFisicas.Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();
        }
    }
}
