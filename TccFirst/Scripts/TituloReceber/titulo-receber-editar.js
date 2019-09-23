
$(function () {
    $idTituloReceber = $("#id").val();
    $idAlterar = -1;

    $tabelaTituloReceber = $("#tituloReceber-tabela").DataTable({
        ajax: '/tituloreceber/obtertodos',
        serverSide: true,
        columns: [
            { data: "ValorTotal" },
            { data: "QuantidadeParcelas" },
            { data: "Descricao" },
            { data: "DataLancamento" },
            { data: "DataRecebimento" },
            { data: "DataVencimento" },
            //{ data: "Status" },
            { data: "Complemento" },
            {
                render: function (data, type, row) {
                    return "\
                    <button class='btn btn-primary botao-editar fa fa-edit'\
                        data-id=" + row.Id + "> Editar</button>\
                    <button class='btn btn-danger botao-apagar fa fa-trash'\
                        data-id=" + row.Id + "> Apagar</button>";
                }
            }
        ]
    });

    $("#tituloReceber-tabela").on('click', '.botao-apagar', function () {
        confirma = confirm("Deseja Realmente Apagar?")
        if (confirma == true) {
            $id = $(this).data('id');
            $.ajax({
                url: '/tituloreceber/apagar?id=' + $id,
                method: "get",
                success: function (data) {
                    if ($('#tituloReceber-campo-tipo-pessoa-fisica').is(':checked')) {
                        radioButton = '"ClientePessoaFisica.Nome"';
                    } else {
                    }
                    $tabelaTituloReceber.ajax.reload();
                },
                error: function (err) {
                    alert('Não foi possível apagar');
                }
            });
        }
    });

    function monstrarMensagem(texto, titulo, tipo) {
        // Tipo -> error ,info, primary, success, default
        // if ($('#tituloReceber-campo-tipo-pessoa-juridica').is(':checked') && $IdClientePessoaJuridica == undefined) {
        //monstrarMensagem('Selecione uma Pessoa Jurídica', '', 'error');
        //$("#tituloReceber-campo-pessoa-Juridica").select2('open');
        return false;
        new PNotify({
            title: titulo,
            text: texto,
            icon: 'icofont icofont-info-circle',
            type: tipo
        });
    }

});