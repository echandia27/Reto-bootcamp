document.addEventListener('DOMContentLoaded', function(){
    const inputBox = document.getElementById('inputBox');
    const outputBox = document.getElementById('outputBox');
    console.log('ok')


    inputBox.addEventListener('input', function(){
        const message = inputBox.value.toUpperCase(); 
        outputBox.textContent =`El mensaje es: ${message}`;
    });
});

