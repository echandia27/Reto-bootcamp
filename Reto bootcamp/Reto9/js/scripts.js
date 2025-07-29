document.addEventListener('DOMContentLoaded', function(){
    //grafico de barras de top20paises
    fetch('data/top20Paises.json')
        .then(Response => Response.json())
        .then(data => {
            const ctx =document.getElementById('graficoBarrasPaíses').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.pais),
                    datasets: [{
                        label: 'Porcentaje de Energía Renovable',
                        data: data.map(item => item['promedio_renovables']),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display:true,
                                text:'Porcentaje (%)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Paises'
                            }
                        }
                    }
                }
            });
        });

        //grafico de barras de produccion de energias renovables por regiones
    fetch('data/topRegiones.json')
        .then(Response => Response.json())
        .then(data => {
            const ctx =document.getElementById('graficoBarrasRegiones').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.region),
                    datasets: [{
                        label: 'Porcentaje de Energía Renovable',
                        data: data.map(item => item['promedio_renovables']),
                        backgroundColor: 'rgba(86, 12, 138, 0.6)',
                        borderColor: 'rgba(86, 12, 138, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display:true,
                                text:'Porcentaje (%)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Paises'
                            }
                        }
                    }
                }
            });
        });

        //Grafico de linea de comparativa de produccion de energia renovable

    fetch('data/Colombia_SurAmerica.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => item.anno <= 2021);
            const ctx = document.getElementById('graficoLineasComparativa').getContext('2d');
            console.log(data);
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [...new Set(filteredData.map(item => item.anno))],
                    datasets: [
                        {
                            label:'Colombia',
                            data: filteredData.filter(item => item.region === 'Colombia').map(item => item.renovables),
                            borderColor: 'rgba(204, 7, 50, 1)',
                            backgroundColor: 'rgba(255, 99, 63, 0.2)',
                            fill: false,
                            borderWidth: 1,
                            tension: 0.2
                        },
                        {
                            label:'Sur America',
                            data: filteredData.filter(item => item.region === 'South America').map(item => item.renovables),
                            borderColor: 'rgba(89, 50, 209, 1)',
                            backgroundColor: 'rgba(255, 99, 63, 0.2)',
                            fill: false,
                            borderWidth: 1,
                            tension: 0.2
                        }
                    ]
                }
            });
                

        });


});