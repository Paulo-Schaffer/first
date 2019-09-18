﻿$(function () {   
    $idAlterar = -1;

    $tabelaParcelaReceber = $("#parcelaReceber-tabela").DataTable({
        "scrollX": true,
        ajax: '/parcelareceber/obtertodos',
        serverSide: true,
        columns: [
            { data: "IdTituloReceber" },
            { data: "Valor" },           
            { data: "Status" },
            {
                render: function (data, type, row) {
                    return moment(row.DataVencimento).format('YYYY-MM-DD')
                }
            },
            {
                render: function (data, type, row) {
                    return moment(row.DataRecebimento).format('YYYY-MM-DD')
                }
            },
           
            {
                render: function (data, type, row) {
                    return '<button class="btn btn-primary botao-editar" data-id="' + row.Id + '">Editar</button>\<button class="btn btn-danger botao-apagar" data-id="' + row.Id + '">Apagar</button>'
                }
            }            
        ]            
    });

    $("#parcelaReceber-botao-salvar").on("click", function () {
        $idTituloReceber = $('#parcelaReceber-campo-tituloReceber').val();
        $valor = $('#parcelaReceber-campo-valor').val();
        $status = $('#parcelaReceber-campo-status').val();
        $dataVencimento = $('#parcelaReceber-campo-dataVencimento').val();
        $dataRecebimento = $('#parcelaReceber-campo-dataRecebimento').val();
          
        if ($idAlterar == -1) {
            inserir($idTituloReceber, $valor, $status, $dataVencimento, $dataRecebimento);
        } else {
            alterar($idTituloReceber, $valor, $status, $dataVencimento, $dataRecebimento);
        }
    });

    function alterar($idTituloReceber, $valor, $status, $dataVencimento, $dataRecebimento) {

        $.ajax({
            url: "/parcelareceber/editar",
            method: "post",
            data: {
                
                idTituloReceber: $idTituloReceber,
                valor: $valor,
                status: $status,
                dataVencimento: $dataVencimento,
                dataRecebimento: $dataRecebimento,
                id: $idAlterar
            },
            success: function (data) {
                $("#modal-parcelaReceber").modal("hide");
                $idAlterar = -1;
                LimparCampos();
                $tabelaParcelaReceber.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel alterar");
            }
        });
    }

    function inserir($idTituloReceber, $valor, $status, $dataVencimento, $dataRecebimento) {

        $.ajax({
            url: '/parcelaReceber/cadastro',
            method: 'post',
            data: {              
                IdTituloReceber: $idTituloReceber,
                Valor: $valor,
                Status: $status,
                DataVencimento: $dataVencimento,
                DataRecebimento: $dataRecebimento,
            },
            success: function (data) {
                LimparCampos();
                $('#modal-parcelaReceber').modal('hide');
                $tabelaParcelaReceber.ajax.reload();
            },
            error: function (err) {
                alert("Não foi possivel cadastrar");
            }
        });
    }

    $('#parcelaReceber-tabela').on('click', '.botao-apagar', function () {
        $idAlterar = $(this).data('id');

        $.ajax({
            url: '/parcelaReceber/apagar?id=' + $idAlterar,
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
        $idAlterar = $(this).data('id');

        $.ajax({
            url: "/parcelaReceber/obterpeloid?id=" + $idAlterar,
            method: 'get',
            success: function (data) {
                $idAlterar = $id;
                $("#parcelaReceber-campo-tituloReceber").val(data.IdTituloReceber);
                $("#parcelaReceber-campo-valor").val(data.Valor);
                $("#parcelaReceber-campo-status").val(data.Status);
                var DataVencimento = moment(data.DataVencimento);
                console.log();
                $("#parcelaReceber-campo-dataVencimento").val(DataVencimento.format('YYYY-MM-DD'));
                var DataRecebimento = moment(data.DataRecebimento);
                console.log();
                $("#parcelaReceber-campo-dataRecebimento").val(DataRecebimento.format('YYYY-MM-DD'));
                $('#modal-parcelaReceber').modal('show');
            },
            error: function (err) {
                alert("Não foi possivel editar")
            }
        });
    });

    function LimparCampos() {
        $('#parcelaReceber-campo-tituloReceber').val("");
        $('#parcelaReceber-campo-valor').val("");
        $('#parcelaReceber-campo-status').val("");
        $('#parcelaReceber-campo-dataVencimento').val("");
        $('#parcelaReceber-campo-dataRecebimento').val("");
        $idAlterar = -1;
    }

    $('#modal-parcelaReceber').on('hidden.bs.modal', function (e) {
        LimparCampos();
    })
});

