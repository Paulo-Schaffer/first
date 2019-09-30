$(document).ready(function () {
    $("#modal-cadastro-conta-corrente").validate({
        rules: {
            agencia: { required: true },
            NumeroConta: { required: true },
        },
        messages: {
            agencia: { required: "O campo nome deve ser preenchido" },
            NumeroConta: { required: "O campo numero da conta deve ser preenchido" },
        }
    });
});