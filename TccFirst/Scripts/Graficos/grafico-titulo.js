$("#data-inicial").on("change", function () {
    buscarDados();
})

$("#data-final").on("change", function () {
    buscarDados();
});
$chart = null;


function buscarDados() {
    $dataInicial = $("#data-inicial").val();
    $dataFinal = $("#data-final").val();

    if ($dataInicial == "" || $dataFinal == "") {
        return;
    }


    $.ajax({
        url: '/graficotitulo/graficodados',
        data: {
            dataInicial: $dataInicial,
            dataFinal: $dataFinal
        },
        success: function (data) {

            if ($chart == null) {

                $chart = Morris.Area({
                    element: 'morris-extra-area',
                    data: data,
                    lineColors: ['#7E81CB', '#f54257'],
                    xkey: 'DataCompleta',
                    ykeys: ['TituloPagar', 'TituloReceber'],
                    labels: ['TituloReceber', 'TituloPagar'],
                    pointSize: 0,
                    lineWidth: 0,
                    resize: true,
                    fillOpacity: 0.8,
                    behaveLikeLine: true,
                    gridLineColor: '#5FBEAA',
                    hideHover: 'auto',

                });
            } else {
                $chart.setData(data);
            }
        }
    });

}