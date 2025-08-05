document.addEventListener('DOMContentLoaded', function(){
    fetch('csv_proyecto/csvjson.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const ctx =document.getElementById('GraficoMotos').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.Anno),
                datasets: [{
                    label:'CO₂ Motos',
                    data: data.map(item => item['Motos (Mt)']),
                    backgroundColor: 'rgba(25, 81, 119, 0.6)',
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
                                text:'Porcentaje co2(%)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Año'
                            }
                        }
                    }
                }
        });
    });
});