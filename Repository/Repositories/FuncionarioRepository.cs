using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class FuncionarioRepository : IFuncionarioRepository
    {
        private SistemaContext context;

        public FuncionarioRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(Funcionario funcionario)
        {
            try
            {
                var funcionarioOriginal = context.Funcionarios.FirstOrDefault(x => x.Id == funcionario.Id);

                if (funcionario == null)
                    return false;

                funcionarioOriginal.NomeFuncionario = funcionario.NomeFuncionario;
                funcionarioOriginal.TipoFuncionario = funcionario.TipoFuncionario;
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
                var funcionario = context.Funcionarios.FirstOrDefault(x => x.Id == id);

                if (funcionario == null)
                {
                    return false;
                }

                funcionario.RegistroAtivo = false;
                int quantidadeAfetada = context.SaveChanges();
                return quantidadeAfetada == 1;
            }
            catch (Exception ex)
            {
                throw new Exception("Não possivel apagar");
            }
        }

        public int Inserir(Funcionario funcionario)
        {
            try
            {
                //funcionario.RegistroAtivo = true;
                //context.Funcionarios.Add(funcionario);

                context.Funcionarios.Add(funcionario);
                context.SaveChanges();
                return funcionario.Id;
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possivel inserir");
            }
        }

        public Funcionario ObterPeloId(int id)
        {


            var funcionario = context.Funcionarios.FirstOrDefault(x => x.Id == id);
            return funcionario;

        }

        public List<Funcionario> ObterTodos()
        {
            return context.Funcionarios.Where(x => x.RegistroAtivo == true).OrderBy(x => x.Id).ToList();

        }

    }
}
