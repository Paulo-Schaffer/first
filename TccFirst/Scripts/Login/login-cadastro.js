<<<<<<< HEAD
﻿$(function () {
=======
﻿$(function() {
>>>>>>> parent of ee136f1... Alterações
    $("#login-campo-funcionario").select2({
        ajax: {
            url: "/funcionario/obtertodosselect2",
            dataType: "json"
        }
    });
});