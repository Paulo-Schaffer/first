using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class FornecedorRepository : IFornecedorRepository
    {
        private SistemaContext context;
        public FornecedorRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(Fornecedor fornecedores)
        {
            var fornecedorOriginal = context.Fornecedores.FirstOrDefault(x => x.Id == fornecedores.Id);
            if (fornecedorOriginal == null)
            {
                return false;
            }
            fornecedorOriginal.RazaoSocial = fornecedores.RazaoSocial;
            fornecedorOriginal.NomeFantasia = fornecedores.NomeFantasia;
            fornecedorOriginal.DataCadastro = fornecedores.DataCadastro;
            fornecedorOriginal.Cnpj = fornecedores.Cnpj;
            fornecedorOriginal.Email = fornecedores.Email;
            fornecedorOriginal.Telefone = fornecedores.Telefone;
            fornecedorOriginal.Cep = fornecedores.Cep;
            fornecedorOriginal.Logradouro = fornecedores.Logradouro;
            fornecedorOriginal.Numero = fornecedores.Numero;
            fornecedorOriginal.Bairro = fornecedores.Bairro;
            fornecedorOriginal.Uf = fornecedores.Uf;
            fornecedorOriginal.Cidade = fornecedores.Cidade;
            fornecedorOriginal.Complemento = fornecedores.Complemento;

            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;

        }

        public bool Apagar(int id)
        {
            var fornecedor = context.Fornecedores.FirstOrDefault(x => x.Id == id);

            if (fornecedor == null)
            {
                return false;
            }
            fornecedor.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(Fornecedor fornecedores)
        {
            context.Fornecedores.Add(fornecedores);
            context.SaveChanges();
            return fornecedores.Id;

        }

        public Fornecedor ObterPeloId(int id)
        {
            var fornecedor = context.Fornecedores.FirstOrDefault(x => x.Id == id);
            return fornecedor;
        }

        public List<Fornecedor> ObterTodos(string busca)
        {
            return context.Fornecedores.Where(x => x.RegistroAtivo == true).ToList();
        }
    }
}
