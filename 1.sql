INSERT INTO cadastroscontacorrente(id_agencia ,numero_conta ,registro_ativo )VALUES(1,12345,1);

INSERT INTO titulos_pagar(caixa ,complemento,data_lancamento,data_recebimento,data_vencimento,descricao,
forma_pagamento,id_categoria_despesa,id_fornecedor,quantidade_parcelas,registro_ativo,status,valor_total)
VALUES(1,'alo',12/12/2019,12/12/2019,12/12/2019,'alo',1,1,,1,1,1,1);

SELECT*FROM transacoes;