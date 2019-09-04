using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
   public class ClientePessoaJuridicaRepository : IClientePessoaJuridicaRepository
    {
        private SistemaContext context;

        public ClientePessoaJuridicaRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(ClientePessoaJuridica clientePessoaJuridica)
        {
            var clientePessoaJuridicaOriginal = context.ClientesPessoasJuridicas         
                 .FirstOrDefault(x => x.Id == clientePessoaJuridica.Id);
            if(clientePessoaJuridicaOriginal==null)
            {
                return false;
            }
            clientePessoaJuridicaOriginal.RazaoSocial = clientePessoaJuridica.RazaoSocial;
            clientePessoaJuridicaOriginal.Atividade= clientePessoaJuridica.Atividade;
            clientePessoaJuridicaOriginal.NomeFantasia= clientePessoaJuridica.NomeFantasia;
            clientePessoaJuridicaOriginal.DataCadastro= clientePessoaJuridica.DataCadastro;
            clientePessoaJuridicaOriginal.Cnpj= clientePessoaJuridica.Cnpj;
            clientePessoaJuridicaOriginal.Email= clientePessoaJuridica.Email;
            clientePessoaJuridicaOriginal.Filial= clientePessoaJuridica.Filial;
            clientePessoaJuridicaOriginal.Telefone= clientePessoaJuridica.Telefone;
            clientePessoaJuridicaOriginal.Cep= clientePessoaJuridica.Cep;
            clientePessoaJuridicaOriginal.Logradouro= clientePessoaJuridica.Logradouro;
            clientePessoaJuridicaOriginal.Numero= clientePessoaJuridica.Numero;
            clientePessoaJuridicaOriginal.Bairro= clientePessoaJuridica.Bairro;
            clientePessoaJuridicaOriginal.Uf= clientePessoaJuridica.Uf;
            clientePessoaJuridicaOriginal.Cidade= clientePessoaJuridica.Cidade;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public bool Apagar(int id)
        {
            var clientePessoaJuridica=context.ClientesPessoasJuridicas.FirstOrDefault(x => x.Id == id);
            if (clientePessoaJuridica == null)
            {
                return false;
            }
            clientePessoaJuridica.RegistroAtivo = false;
            
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(ClientePessoaJuridica clientePessoaJuridica)
        {
            context.ClientesPessoasJuridicas.Add(clientePessoaJuridica);
            context.SaveChanges();
            return clientePessoaJuridica.Id;
        }

        public ClientePessoaJuridica ObterPeloId(int id)
        {
            var clientePessoaJuridica = context.ClientesPessoasJuridicas
                 .FirstOrDefault(x => x.Id == id);
            return clientePessoaJuridica;
        }

        public List<ClientePessoaJuridica> ObterTodos()
        {
            return context.ClientesPessoasJuridicas
               .Where(x => x.RegistroAtivo == true)
               .OrderBy(x => x.Id)
               .ToList();
        }
    }
}
