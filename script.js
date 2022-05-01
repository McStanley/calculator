const screen = document.querySelector('.screen');
const numericButtons = document.querySelectorAll('.btn-num');
const buttonDelete = document.querySelector('#btn-del');

let currentInput = '';

function init() {
    numericButtons.forEach(button => {
        button.addEventListener('click', appendInput);
    });
    buttonDelete.addEventListener('click', deleteInput);
}

function operate(operator, a, b) {
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
            break;
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
    return a / b;
}

function appendInput(event) {
    // Allow only one decimal point
    if (event.target.textContent === '.') {
        if (currentInput.includes('.')) return;
    }
    currentInput += event.target.textContent;
    updateScreen();
}

function deleteInput(event) {
    currentInput = currentInput.slice(0, -1);
    updateScreen();
}

function updateScreen() {
    screen.textContent = currentInput;
}

init();
