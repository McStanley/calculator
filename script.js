const screen = document.querySelector('.screen');
const numericButtons = document.querySelectorAll('.btn-num');
const operatorButtons = document.querySelectorAll('.btn-opr');
const buttonEquals = document.querySelector('#btn-eql');
const buttonDelete = document.querySelector('#btn-del');
const buttonClear = document.querySelector('#btn-clr');

let currentValue;
let lastValue;
let operator;
let result;

function init() {
    numericButtons.forEach(button => {
        button.addEventListener('click', appendInput);
    });
    operatorButtons.forEach(button => {
        button.addEventListener('click', selectOperation);
    });
    buttonEquals.addEventListener('click', calculateResult);
    buttonDelete.addEventListener('click', deleteInput);
    buttonClear.addEventListener('click', clearState)

    updateScreen(currentValue);
}

function appendInput(event) {
    // Initialize currentValue if undefined
    if (!currentValue) {
        currentValue = '';
    }
    // Limit input length to 10 digits
    if (currentValue.length > 9) {
        return;
    }
    // Allow only one decimal point
    if (event.target.textContent === '.') {
        if (currentValue.includes('.')) return;
    }
    currentValue += event.target.textContent;
    updateScreen(currentValue);
}

function deleteInput(event) {
    // Skip if currentValue is undefined or empty
    if (currentValue) {
        currentValue = currentValue.slice(0, -1);
    }
    lastValue = currentValue;
    updateScreen(currentValue);
}

function selectOperation(event) {
    if (!result) {
        result = currentValue;
    } else if (currentValue) calculateResult();

    if (event.target.textContent !== '=') lastValue = result;
    currentValue = undefined;

    switch (event.target.textContent) {
        case '+':
            operator = 'add';
            break;
        case '-':
            operator = 'subtract';
            break;
        case '×':
            operator = 'multiply';
            break;
        case '÷':
            operator = 'divide';
            break;
        default:
            break;
    }
}

function calculateResult(event) {
    if (event && !currentValue) {
        currentValue = lastValue;
    }

    result = roundResult(operate(operator, result, currentValue));
    updateScreen(result);
    lastValue = currentValue;
    currentValue = undefined;
}

// Round the result to prevent screen overflow
function roundResult(result) {
    if (result.toString().length > 10) {
        if (result.toFixed().length < 9) {
            return result.toFixed(9-result.toFixed().length);
        } else {
        return result.toPrecision(4);
        }
    }
    return result;
}

function operate(operator, a, b) {
    a = a ? Number(a) : 0;
    b = b ? Number(b) : 0;

    switch (operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide (a, b);
        default:
            // Return currentValue if operator is unspecified
            return b;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    // Don't let user divide by 0
    if (b === 0) {
        alert("Can't divide by 0!");
        return undefined;
    } else {
        return a / b;
    }
}

function updateScreen(value) {
    screen.textContent = value ? value : '0';
}

function clearState() {
    currentValue = undefined;
    lastValue = undefined;
    operator = undefined;
    result = undefined;

    updateScreen(currentValue);
}

init();
