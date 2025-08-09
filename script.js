function calculateTip() {
    // Obtener los valores de los inputs
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const tipPercentage = parseFloat(document.getElementById('tipPercentage').value);
    
    // se valida que los campos no estén vacios
    if (isNaN(billAmount) || isNaN(tipPercentage)) {
        alert('Por favor, ingrese valores válidos en ambos campos.');
        return;
    }
    
    if (billAmount <= 0 || tipPercentage < 0) {
        alert('El monto de la cuenta debe ser mayor a 0 y el porcentaje no puede ser negativo.');
        return;
    }
    
    // Calcula la propina
    let tipAmount = (billAmount * tipPercentage) / 100;
    
    // Verificar si la propina es menor a Q2
    if (tipAmount < 2) {
        alert('¡Atención! El monto de la propina es muy bajo (menor a Q2.00). Se establecerá el monto mínimo de Q5.00');
        tipAmount = 5.00;
    }
    
    // Calcular el total a pagar
    const totalAmount = billAmount + tipAmount;
    
    // Muestra los resultados
    displayResults(tipAmount, totalAmount);
}

function displayResults(tipAmount, totalAmount) {
    // Obtener elementos del DOM
    const resultsArea = document.getElementById('results');
    const tipAmountElement = document.getElementById('tipAmount');
    const totalAmountElement = document.getElementById('totalAmount');
    
    // Formatear los valores a dos decimales
    tipAmountElement.textContent = `Q ${tipAmount.toFixed(2)}`;
    totalAmountElement.textContent = `Q ${totalAmount.toFixed(2)}`;
    
    // Aplicar colores según el monto de la propina
    applyTipColorClass(tipAmountElement, tipAmount);
    
    // Mostrar el área de resultados con animación
    resultsArea.style.display = 'block';
    resultsArea.classList.add('show');
}

function applyTipColorClass(element, tipAmount) {
    element.classList.remove('tip-low', 'tip-medium', 'tip-high');
    
    if (tipAmount < 10) {
        element.classList.add('tip-low');
    } else if (tipAmount >= 10 && tipAmount < 50) {
        element.classList.add('tip-medium');
    } else {
        element.classList.add('tip-high');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calculateTip();
            }
        });
    });
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const resultsArea = document.getElementById('results');
            resultsArea.classList.remove('show');
        });
    });
});
