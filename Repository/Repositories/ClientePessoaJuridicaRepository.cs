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

        public bool Alterar(ClientePessoaJuridica clientepessoajuridica)
        {
            var clientePessoaJuridicaOriginal = context.ClientesPessoasJuridicas
                 .Where(x => x.Id == clientepessoajuridica.Id)
                 .FirstOrDefault();
            if(clientePessoaJuridicaOriginal==null)
            {
                return false;
            }
            clientePessoaJuridicaOriginal.RazaoSocial = clientepessoajuridica.RazaoSocial;
            clientePessoaJuridicaOriginal.Atividade=clientepessoajuridica.Atividade;
            clientePessoaJuridicaOriginal.NomeFantasia=clientepessoajuridica.NomeFantasia;
            clientePessoaJuridicaOriginal.DataCadastro=clientepessoajuridica.DataCadastro;
            clientePessoaJuridicaOriginal.Cnpj=clientepessoajuridica.Cnpj;
            clientePessoaJuridicaOriginal.Email=clientepessoajuridica.Email;
            clientePessoaJuridicaOriginal.Filial=clientepessoajuridica.Filial;
            clientePessoaJuridicaOriginal.Telefone=clientepessoajuridica.Telefone;
            clientePessoaJuridicaOriginal.Cep=clientepessoajuridica.Cep;
            clientePessoaJuridicaOriginal.Logradouro=clientepessoajuridica.Logradouro;
            clientePessoaJuridicaOriginal.Numero=clientepessoajuridica.Numero;
            clientePessoaJuridicaOriginal.Bairro=clientepessoajuridica.Bairro;
            clientePessoaJuridicaOriginal.Uf=clientepessoajuridica.Uf;
            clientePessoaJuridicaOriginal.Cidade=clientepessoajuridica.Cidade;
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
            context.SaveChanges();
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(ClientePessoaJuridica clientepessoajuridica)
        {
            context.ClientesPessoasJuridicas.Add(clientepessoajuridica);
            context.SaveChanges();
            return clientepessoajuridica.Id;
        }

        public ClientePessoaJuridica ObterPeloId(int id)
        {
            var clientePessoaJuridica = context.ClientesPessoasJuridicas
                 .Where(x => x.Id == id)
                 .FirstOrDefault(x => x.Id == id);
            return clientePessoaJuridica;
        }

        public List<ClientePessoaJuridica> ObterTodos()
        {
            return context.ClientesPessoasJuridicas
               .Where(x => x.RegistroAtivo == true)
               .OrderBy(x => x.RazaoSocial)
               .ToList();
        }
    }
}
