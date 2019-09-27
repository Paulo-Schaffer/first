
$.ajax({
    url: '/relatorio/fluxocaixadados',
    data: {
        dataInicial: "2019-06-20",
        dataFinal: "2019-06-20"
    },
    success: function (data) {

    }
});


Morris.Area({
    element: 'morris-extra-area',
    data: [
        {
            period: '2010',
            transacao: 0,
            caixa: 0
        },
        {
            period: '2011',
            transacao: 50,
            caixa: 15
        },
        {
            period: '2012',
            transacao: 20,
            caixa: 50
        }
    ],
    lineColors: ['#7E81CB', '#01C0C8'],
    xkey: 'period',
    ykeys: ['transacao', 'caixa'],
    labels: ['Caixa', 'Transação'],
    pointSize: 0,
    lineWidth: 0,
    resize: true,
    fillOpacity: 0.8,
    behaveLikeLine: true,
    gridLineColor: '#5FBEAA',
    hideHover: 'auto'

});