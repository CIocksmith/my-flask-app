// index.js

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';

    const updateDisplay = () => {
        display.textContent = currentInput || '0';
    };

    const buttons = document.querySelectorAll('.calculator__functions button');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.value || e.target.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                // Handle numbers and decimal points
                if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
                currentInput += value;
                updateDisplay();
            } else if (value === 'clear') {
                // Clear display
                currentInput = '';
                operator = '';
                firstOperand = '';
                updateDisplay();
            } else if (value === 'pos-neg') {
                // Toggle sign
                currentInput = (parseFloat(currentInput) * -1).toString();
                updateDisplay();
            } else if (value === '%') {
                // Percentage calculation
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay();
            } else if (['+', '-', '*', '/'].includes(value)) {
                // Handle operators
                firstOperand = currentInput;
                operator = value;
                currentInput = '';
            } else if (value === '=') {
                // Calculate result
                if (firstOperand && operator && currentInput) {
                    try {
                        const result = eval(`${firstOperand} ${operator} ${currentInput}`);
                        currentInput = result.toString();
                        operator = '';
                        firstOperand = '';
                        updateDisplay();
                    } catch (e) {
                        display.textContent = 'Error';
                    }
                }
            }
        });
    });
});
