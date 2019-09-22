INSERT INTO cadastros_conta_corrente(id_agencia,numero_conta,registro_ativo)VALUES(1,1,1);

DELETE FROM fornecedores;

INSERT INTO titulos_receber(id_categoria_receita,id_cliente_pessoa_fisica ,id_cliente_pessoa_juridica, valor_total,quantidade_parcela,descricao,
	data_lancamento,data_recebimento,data_vencimento,registro_ativo) VALUES(1,1,1,1200,2,'alo vó',19/08/2000,19/09/2000,19/08/1032,1);

	SELECT*FROM titulos_pagar;

INSERT INTO titulos_pagar(descricao,forma_pagamento,caixa,valor_total,status,data_lancamento,data_recebimento,data_vencimento,
complemento,quantidade_parcelas,registro_ativo,id_fornecedor,id_categoria_despesa)VALUES('alo pai','crédito',1,1200,
'pago',19/08/2000,19/09/2000,19/08/2001,'apto',12,1,1,1);

SELECT*FROM titulos_receber;