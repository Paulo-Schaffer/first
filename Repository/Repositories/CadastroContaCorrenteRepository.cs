﻿using Model;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class CadastroContaCorrenteRepository : ICadastroContaCorrenteRepository
    {
        private SistemaContext context;

        public CadastroContaCorrenteRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(CadastroContaCorrente cadastrosContaCorrente)
        {
               var CadastroContaCorrenteOriginal = context.CadastroContaCorrentes.Where(x => x.Id == cadastrosContaCorrente.Id).FirstOrDefault();

            if(cadastrosContaCorrente == null)
            {
                return false;
            }

            CadastroContaCorrenteOriginal.IdAgencia = cadastrosContaCorrente.IdAgencia;
            CadastroContaCorrenteOriginal.NumeroConta = cadastrosContaCorrente.NumeroConta;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;

        }

        public bool Apagar(int id)
        {
            var CadastroContaCorrente = context.CadastroContaCorrentes.FirstOrDefault(x => x.Id == id);
            if (CadastroContaCorrente == null)
            {
                return false;
            }
            CadastroContaCorrente.RegistroAtivo = false;
            int quantidadeAfetada = context.SaveChanges();
            return quantidadeAfetada == 1;
        }

        public int Inserir(CadastroContaCorrente cadastrosContaCorrente)
        {
            context.CadastroContaCorrentes.Add(cadastrosContaCorrente);
            context.SaveChanges();
            return cadastrosContaCorrente.Id;
        }

        public CadastroContaCorrente ObterPeloId(int id)
        {
            var cadastroContaCorrente = context.CadastroContaCorrentes.Where(x => x.Id == id).FirstOrDefault();
            return cadastroContaCorrente;
        }

        public List<CadastroContaCorrente> ObterTodos(string busca)
        {
            return context.CadastroContaCorrentes.Where(x => x.RegistroAtivo == true).ToList();
        }
    }
}
