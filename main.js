const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.result span');

let firstValue = '';
let isFirstValue = true;
let secondValue = '';
let isSecondValue = false;
let sign = '';
let resultValue = 0;

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        const value = e.target.getAttribute('value');
        if (isFirstValue) {
            firstValue += value;
            result.textContent = firstValue;
        } else if (isSecondValue) {
            secondValue += value;
            result.textContent = secondValue;
        }
    });
});

// Decimal point support
const decimalButton = document.querySelector('.comma');
decimalButton.addEventListener('click', () => {
    if (isFirstValue && firstValue.indexOf('.') === -1) {
        firstValue += '.';
        result.textContent = firstValue;
    } else if (isSecondValue && secondValue.indexOf('.') === -1) {
        secondValue += '.';
        result.textContent = secondValue;
    }
});

// Clear (backspace) functionality
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    if (isFirstValue) {
        firstValue = '';
    } else if (isSecondValue) {
        secondValue = '';
    }
    result.textContent = '0';
});

// Operator functionality
const operators = document.querySelectorAll('.sign');
operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        if (firstValue !== '') {
            sign = e.target.getAttribute('value');
            isFirstValue = false;
            isSecondValue = true;
        }
    });
});

// Calculation on equals button click
const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', () => {
    if (firstValue !== '' && secondValue !== '') {
        const num1 = parseFloat(firstValue);
        const num2 = parseFloat(secondValue);

        switch (sign) {
            case '+':
                resultValue = num1 + num2;
                break;
            case '-':
                resultValue = num1 - num2;
                break;
            case '*':
                resultValue = num1 * num2;
                break;
            case '/':
                if (num2 !== 0) {
                    resultValue = num1 / num2;
                } else {
                    resultValue = 'Error: Division by zero';
                }
                break;
            default:
                break;
        }

        result.textContent = resultValue;
        firstValue = resultValue.toString();
        secondValue = '';
        isFirstValue = true;
    }
});
