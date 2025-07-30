// Configuracion de Supabase
const SUPABASE_URL = 'https://dunlkoxcagmiawkbbbey.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bmxrb3hjYWdtaWF3a2JiYmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTA3MjAsImV4cCI6MjA2OTQ2NjcyMH0.RsrgNo_75VBm5kgY9rGMeoiozRQgKE24m8L5Mx438Sw';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async function() {
    //Auntentificación Anonima
    await supabase.auth.signInAnonymously();

    //Ejecutar todas las funciones
    fetchTop20Paises();
    fetchTopRegiones();
    fetchColombiaVsSuramerica();

    
    //grafico de barras de top20paises
    async function fetchTop20Paises(){
        const  { data, error } = await supabase
        .from('top_20_paises')
        .select('*')
        .order('promedio_renovables', { ascending: false})
        .limit(20);

        if (error) throw error;

        createBarChart('graficoBarrasPaíses', data, 'pais', 'promedio_renovables', 'Porcentaje de Energia Renovables', 'rgba(54, 162, 235, 0.6)');
    }

    //Grafica Top Regiones

        async function fetchTopRegiones() {
            const  { data, error } = await supabase
            .from('top_regiones')
            .select('*')
            .order('promedio_renovables', { ascending: false});

        if (error) throw error;

        createBarChart('graficoBarrasRegiones', data, 'region', 'promedio_renovables', 'Porcentaje de Energia Renovable por Región', 'rgba(90, 126, 114, 0.6)');
     
    }

    // Funcion para crear graficos de barras
    function createBarChart(canvasId, data, labelField, dataField, label, backgroundColor) {
        const ctx = document.getElementById(canvasId).getContext('2d')
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item[labelField]),
                datasets: [{
                label: label,
                data: data.map(item => item[dataField]),
                backgroundColor: backgroundColor,
                borderColor: backgroundColor.replace('0.6', '1'),
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
                        text: canvasId.includes('Paises') ? 'Paises' : 'Regiones'
                        }
                    }
                }
            }

        })
    
    }

    //Gráfico Comparativo de Líneas
    async function fetchColombiaVsSuramerica() {
        const { data, error} = await supabase
        .from('colombia_suramerica')
        .select('*')
        .lte('anno', 2021)
        .order('anno', {ascending: true});

        if (error) throw error;

        //procesar los datos que vienen de la consulta
        const colombiaData = data.filter(item => item.region === 'Colombia');
        const suramericaData = data.filter(item => item.region === 'South America');
        const years = [...new Set(data.map(item => item.anno))];

        const ctx = document.getElementById('graficoLineasComparativa').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [
                        {
                            label:'Colombia',
                            data: colombiaData.map(item => item.renovables),
                            borderColor: 'rgba(204, 7, 50, 1)',
                            backgroundColor: 'rgba(255, 99, 63, 0.2)',
                            fill: false,
                            borderWidth: 1,
                            tension: 0.2
                        },
                        {
                            label:'Sur America',
                            data: suramericaData.map(item => item.renovables),
                            borderColor: 'rgba(89, 50, 209, 1)',
                            backgroundColor: 'rgba(255, 99, 63, 0.2)',
                            fill: false,
                            borderWidth: 1,
                            tension: 0.2
                        }
                    ]
                }
            });


        
    }
});


    