async function cargarDatos() {
    const response = await fetch('data/muertes_accidente_electrico.json');
    const datos = await response.json();
    
    const fila = document.getElementById('fila');
    fila.innerHTML = '';

    datos.forEach(item=>{
        const tr = document.createElement('tr');
        const tdEmpresa =document.createElement('td');
        tdEmpresa.textContent = item.empresa;
        const tdFrecuencia = document.createElement('td');
        tdFrecuencia.textContent = item.frecuencia;

        const tdEstado = document.createElement('td');
        const estado = item.frecuencia >= 15 ? '⚠️Grave' : '💀Critico';
        tdEstado.textContent=estado;

        //agregar las celdas a la fila
        tr.appendChild(tdEmpresa);
        tr.appendChild(tdFrecuencia);
        tr.appendChild(tdEstado);

        //agregar fila al tbody
        fila.appendChild(tr);   
    })
}
 // caragar los datos cuando la pagina este lista 
document.addEventListener('DOMContentLoaded', cargarDatos);

       
