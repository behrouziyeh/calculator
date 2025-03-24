let add = (a, b) => a + b;
let substract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

let firstOperand = 0;
let operator = "";
let secondOperand = 0;

function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case "+":
            return add(+firstNumber, +secondNumber);
            break;

        case "-":
            return substract(+firstNumber, +secondNumber);
            break;

        case "*":
            return multiply(+firstNumber, +secondNumber);
            break;

        case "/":
            return divide(+firstNumber, +secondNumber);
            break;

        default:
            break;
    }
}
