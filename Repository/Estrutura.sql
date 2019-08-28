DROP TABLE funcionarios, logins, clientes_pessoa_fisica, clientes_pessoa_juridica, categorias_despesas,categorias_receita, fornecedores, titulos_receber, titulos_pagar, parcelas_receber,parcelas_pagar, caixas, movimentacoes_financeira_saida, movimentacoes_financeiras_entradas, historicos, agencias, contas_corrente;


CREATE TABLE funcionarios(
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(45),
	tipo_funcionario INT
);

CREATE TABLE logins(
	id INT PRIMARY KEY IDENTITY(1,1),
	usuario VARCHAR(45),
	senha VARCHAR(45),
	
	id_funcionarios INT,
	FOREIGN KEY (id_funcionarios) REFERENCES funcionarios(id)	
);

CREATE TABLE clientes_pessoa_fisica(
id INT PRIMARY KEY IDENTITY (1,1),
nome VARCHAR(100),
cpf VARCHAR (14),
rg VARCHAR(20),
data_nascimento DATETIME2(7),
limite_credito DECIMAL(9,2),
email VARCHAR(50),
telefone VARCHAR(20),
cep VARCHAR(9),
logradouro VARCHAR (100),
numero INT,
bairro VARCHAR(100),
uf VARCHAR(2),
cidade VARCHAR(100)
);

CREATE TABLE clientes_pessoa_juridica(
id INT PRIMARY KEY IDENTITY(1,1), 
razao_social VARCHAR(100),
atividade VARCHAR(100),
nome_fantasia VARCHAR(100),
data_cadastro DATETIME2,
cnpj VARCHAR(18),
email VARCHAR(50),
filial VARCHAR(100),
telefone VARCHAR(15),
cep VARCHAR(9),
lougradouro VARCHAR(100),
numero INT,
bairro VARCHAR(100),
uf VARCHAR(2),
cidade VARCHAR(100),
);

CREATE TABLE categorias_despesas(
id INT PRIMARY KEY IDENTITY(1,1),
tipo_despesa VARCHAR(45)
);

CREATE TABLE categorias_receita(
id INT PRIMARY KEY IDENTITY(1,1),
tipo_receita VARCHAR (100)
);

CREATE TABLE fornecedores(
id INT PRIMARY KEY IDENTITY (1,1),
razao_social VArCHAR(100),
atividade VARCHAR(100),
nome_fantasia VARCHAR(100),
data_cadastro DATETIME2(7),
cnpj VARCHAR(18),
email VARCHAR(50),
telefone VARCHAR(20),
cep VARCHAR(9),
logradouro VARCHAR (100),
numero INT,
bairro VARCHAR(100),
uf VARCHAR(2),
cidade VARCHAR(100)
);

CREATE TABLE titulos_receber(
id INT PRIMARY  KEY IDENTITY(1,1),
id_clientes_pessoa_juridica INT,
FOREIGN KEY(id_clientes_pessoa_juridica) REFERENCES clientes_pessoa_juridica(id),
id_clientes_pessoa_fisica INT, 
FOREIGN KEY(id_clientes_pessoa_fisica) REFERENCES clientes_pessoa_fisica(id),
descricao TEXT,
valor_total DECIMAL(6,2),
status VARCHAR(50),
data_lancamento DATETIME,
data_recebimento DATETIME,
complemento BIT,
quantidade_parcela INT
);

CREATE TABLE titulos_pagar(
	id INT PRIMARY KEY IDENTITY(1,1),
	descricao TEXT,
	forma_pagamento VARCHAR(45),
	caixa BIT,
	valor_total DECIMAL(6,2),
	stauts VARCHAR(45),
	data_lancamento DATETIME2,
	data_recebimento DATETIME2,
	data_vencimento DATETIME2,
	complemento BIT,
	quantidade_parcela  INT,

	id_fornecedores INT,
	FOREIGN KEY (id_fornecedores) REFERENCES fornecedores(id),

	id_categorias_despesas INT,
	FOREIGN KEY (id_categorias_despesas) REFERENCES categorias_despesas(id)
);

CREATE TABLE parcelas_receber(
 id INT PRIMARY KEY IDENTITY(1,1), 
 valor DECIMAL(8,2),
 status VARCHAR (50),
 data_vencimento DATETIME2,
 data_recibimento DATETIME2,
 id_titulos_receber INT,
 FOREIGN KEY (id_titulos_receber) REFERENCES titulos_receber(id)
 );

CREATE TABLE caixas(
id INT PRIMARY KEY IDENTITY(1,1),
id_historicos INT,
FOREIGN KEY(id_historicos) REFERENCES historicos(id),
descricao TEXT,
documento VARCHAR(100),
forma_pagamento VARCHAR (60),
valor DECIMAL(6,2),
data_lancamento DATETIME,
status VARCHAR(45)
);

CREATE TABLE movimentacoes_financeira_saida(
id INT PRIMARY KEY IDENTITY(1,1),
id_contas_corrente INT,
FOREIGN KEY(id_contas_corrente) REFERENCES contas_corrente(id),
id_caixas INT,
FOREIGN KEY(id_caixas) REFERENCES caixas(id),
id_parcelas_pagar INT,
FOREIGN KEY(id_parcelas_pagar) REFERENCES parcelas_pagar(id),
valor DECIMAL(6,2)
);

CREATE TABLE parcelas_pagar(
id INT PRIMARY KEY IDENTITY	(1,1),
VALOR INT,
status VARCHAR(50),
vencimento DATETIME2,
data_pagamento DATETIME2,
);

CREATE TABLE movimentacoes_financeiras_entradas(
id INT PRIMARY KEY IDENTITY(1,1),
valor DECIMAL(6,2),

id_contas_corrente INT,
FOREIGN KEY(id_contas_corrente) REFERENCES contas_corrente(id),

id_caixas INT,
FOREIGN KEY(id_caixas) REFERENCES caixas(id),

id_parcelas_receber INT,
FOREIGN KEY(id_parcelas_receber) REFERENCES parcelas_receber(id)
);

CREATE TABLE historicos(
 id INT PRIMARY KEY IDENTITY(1,1), 
 descricao TEXT,
 );

CREATE TABLE agencias(
  id INT PRIMARY KEY IDENTITY(1,1),
  id_banco INT,
  nome_agencia VARCHAR(45),
  numero_agencia VARCHAR(45)
); 

CREATE TABLE contas_corrente(
  id INT PRIMARY KEY IDENTITY(1,1),
  
  numero_conta VARCHAR(45),
  Descricao TEXT,
  documento VARCHAR(45),
  tipo_receita_depesa INT,
  tipo_pagamento DECIMAL(8,2),
  valor DECIMAL(8,2),
  status VARCHAR(45),
  data_lancamento DATETIME2,
  data_vencimento DATETIME2,
  data_recebimento DATETIME2,
  nome_banco VARCHAR(45),
  numero_banco DECIMAL(8,2),

  id_historicos INT,
  FOREIGN KEY(id_historicos) REFERENCES historicos(id),
 
  id_categorias_despesas INT,
  FOREIGN KEY(id_categorias_despesas) REFERENCES categorias_despesas(id),
  
  id_categorias_receita INT,
  FOREIGN KEY(id_categorias_receita) REFERENCES categorias_receita(id),
  
  id_agencias INT,
  FOREIGN KEY(id_agencias) REFERENCES agencias(id),
);














