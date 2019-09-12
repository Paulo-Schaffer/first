$(function () {
    $idParcelaReceber = $("#id").val();
    $idAlterar = -1;

    $tabelaParcelaReceber = $("#parcelaReceber-tabela").DataTable({
        ajax: "/parcelaReceber/obtertodos",
        severSide: true,
        coluns: [
            { data: "IdTituloReceber" },
            { data: "Valor" },           
            { data: "Status" },            
            { data: "DataVencimento" },
            { data: "DataRecebimento" },
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'
                }
            }            
        ]            
    });

    $("#parcelaReceber-botao-salvar").on("click", function () {
        $idTitulosReceber = $('#parcelasReceber-campo-tituloReceber').val();
        $valor = $('#parcelasReceber-campo-valor').val();
        $status = $('#parcelasReceber-campo-status').val();
        $dataVencimento = $('#parcelasReceber-campo-dataVencimento').val();
        $dataRecebimento = $('#parcelasReceber-campo-dataRecebimento').val();
        debugger;
       
        if ($idAlterar == -1) {
            inserir($idTitulosReceber, $valor, $status, $dataVencimento, $dataRecebimento);
        } else {
            alterar($idTitulosReceber, $valor, $status, $dataVencimento, $dataRecebimento);
        }
    });
    function alterar($idTitulosReceber, $valor, $status, $dataVencimento, $dataRecebimento) {

        $.ajax({
            url: "/parcelaReceber/alterar",
            method: "post",
            data: {
                idParcelaReceber:$idParcelaReceber,
                idTitulosReceber:$idTitulosReceber,
                valor: $valor,
                status:$status,
                dataVencimento: $dataVencimento,
                dataRecebimento: $dataRecebimento
            },
            success: function (data) {
                $("#modal-parcelaReceber").modal("hide");
               
                $tabelaParcelaReceber.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel alterar");
            }
        });
    }
    function inserir($idTitulosReceber, $valor, $status, $dataVencimento, $dataRecebimento) {

        $.ajax({
            url: "/parcelaReceber/cadastro",
            method: "post",
            data: {
                idParcelaReceber:$idParcelaReceber,
                idTitulosReceber: $idTitulosReceber,
                valor: $valor,
                status: $status,
                dataVencimento: $dataVencimento,
                dataRecebimento: $dataRecebimento
            },
            success: function (data) {
                $("#modal-parcelaReceber").modal("hide");
                
                $tabelaParcelaReceber.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel cadastrar");
            }
        });
    }
    $('#parcelaReceber-tabela').on('click', '.botao-apagar', function () {
        $id = $(this).data('id');

        $.ajax({
            url: "/parcelaReceber/apagar?id=" + $id,
            method: 'get',
            success: function (data) {
                $tabelaParcelaReceber.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possivel apagar');
            }
        });
    });
    $('#parcelaReceber-tabela').on('click', '.botao-editar', function () {
        $id= $(this).data('id');

        $.ajax({
            url: "/parcelaReceber/obterpeloid?id=" + $id,
            method: 'get',
            success: function (data) {
                $idAlterar = $id;
                $("#parcelasReceber-campo-tituloReceber").val(data.idTitulosReceber);
                $("#parcelasReceber-campo-valor").val(data.valor);
                $("#parcelasReceber-campo-status").val(data.status);
                $("#parcelasReceber-campo-dataVencimento").val(data.dataVencimento);
                $("#parcelasReceber-campo-dataRecebimento").val(data.dataRecebimento);
                $('#modal-clientePessoaJuridica').modal('show');
            },
            error: function (err) {
                alert("Não foi possivel editar")
            }
        });
    });
});