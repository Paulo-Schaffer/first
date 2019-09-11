$(function () {
    $idParcelaReceber = $("#id").val();
    $idAlterar = -1;
    $tabelaTituloReceber = $("#parcelaReceber-tabela").DataTable({
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
       
       
        if ($idAlterar == -1) {
            inserir($idTitulosReceber, $valor, $status, $dataVencimento, $dataRecebimento);
        } else {
            alterar($idTitulosReceber, $valor, $status, $dataVencimento, $dataRecebimento);
        }
    });
    function alterar($idTitulosReceber, $valor, $status, $dataVencimento, $dataRecebimento) {

        $.ajax({
            url: "/parcelaReceber/update",
            method: "post",
            data: {
                idTitulosReceber:$idTitulosReceber,
                valor: $valor,
                status:$status,
                dataVencimento: $dataVencimento,
                dataRecebimento: $dataRecebimento
            },
            success: function (data) {
                $("#modal-parcelaReceber").modal("hide");
                $idAlterar = -1;
                $tabelaParcelaReceber.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel alterar");
            }
        });
    }
    function inserir($idTitulosReceber, $valor, $status, $dataVencimento, $dataRecebimento) {

        $.ajax({
            url: "/parcelaReceber/inserir",
            method: "post",
            data: {
                idTitulosReceber: $idTitulosReceber,
                valor: $valor,
                status: $status,
                dataVencimento: $dataVencimento,
                dataRecebimento: $dataRecebimento
            },
            success: function (data) {
                $("#modal-parcelaReceber").modal("hide");
                $idAlterar = -1;
                $tabelaParcelaReceber.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel cadastrar");
            }
        });
    }
    $('.table').on('click', '.botao-apagar', function () {
        $idApagar = $(this).data('id');

        $.ajax({
            url: "/parcelaReceber/apagar?id=" + $idApagar,
            method: 'get',
            success: function (data) {
                $tabelaParcelaReceber.ajax.reload();
            },
            error: function (err) {
                alert('Não foi possivel apagar');
            }
        });
    });
    $('.table').on('click', '.botao-editar', function () {
        $idAlterar = $(this).data('id');

        $.ajax({
            url: "/parcelaReceber/obterpeloid?id=" + $idAlterar,
            method: 'get',
            success: function (data) {
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