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
        public SistemaContext context;

        public CadastroContaCorrenteRepository()
        {
            context = new SistemaContext();
        }

        public bool Alterar(CadastroContaCorrente cadastrosContaCorrente)
        {
            var cadastroContaCorrenteOriginal = context.CadastroContaCorrentes.FirstOrDefault(x => x.Id == cadastrosContaCorrente.Id);
            if (cadastrosContaCorrente == null)
            {
                return false;
            }

            cadastroContaCorrenteOriginal.IdAgencia = cadastrosContaCorrente.IdAgencia;
            cadastroContaCorrenteOriginal.NumeroConta = cadastrosContaCorrente.NumeroConta;
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
            cadastrosContaCorrente.RegistroAtivo = true;
            context.CadastroContaCorrentes.Add(cadastrosContaCorrente);
            context.SaveChanges();
            return cadastrosContaCorrente.Id;
        }

        public CadastroContaCorrente ObterPeloId(int id)
        {
            var cadastrocontacorrente = context.CadastroContaCorrentes
                .Where(x => x.Id == id).FirstOrDefault();
            return cadastrocontacorrente;
        }

        public List<CadastroContaCorrente> ObterTodos()
        {
            return context.CadastroContaCorrentes.Where(x => x.RegistroAtivo == true)
                .ToList();
        }
    }
}
