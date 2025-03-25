let add = (a, b) => a + b;
let substract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let remainder = (a, b) => a % b;

let firstOperand = "";
let operator = "";
let secondOperand = "";

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

        case "%":
            return remainder(+firstNumber, +secondNumber);
            break;

        default:
            break;
    }
}

const calculator = document.querySelector(".calculator");

const userInputDisplay = calculator.querySelector(".calculator__user-input");
const resultDisplay = calculator.querySelector(".calculator__result");

const digits = calculator.querySelectorAll(".calculator__digit");
const operatorsButtons = calculator.querySelectorAll(".calculator__operator");
const allClearButton = calculator.querySelector(".calculator__all-clear");
const clearButton = calculator.querySelector(".calculator__clear");
const calculateButton = calculator.querySelector(".calculator__equals");

function updateDisplay() {
    userInputDisplay.textContent = `${firstOperand} ${operator} ${secondOperand}`;
    resultDisplay.textContent = "";
}

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        if (operator !== "") {
            secondOperand = secondOperand + String(digit.value);
        } else {
            firstOperand = firstOperand + String(digit.value);
        }
        updateDisplay();
    });
});

operatorsButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        if (secondOperand) {
            firstOperand = operate(firstOperand, operator, secondOperand);
            operator = operatorButton.value;
            secondOperand = "";
        } else if (firstOperand) {
            operator = operatorButton.value;
        }
        updateDisplay();
    });
});

allClearButton.addEventListener("click", () => {
    firstOperand = operator = secondOperand = "";
    updateDisplay();
});

clearButton.addEventListener("click", () => {
    if (secondOperand) {
        secondOperand = secondOperand.split("").slice(0, -1).join("");
    } else if (operator) {
        operator = "";
    } else if (firstOperand) {
        firstOperand = firstOperand.split("").slice(0, -1).join("");
    }
    updateDisplay();
});

calculateButton.addEventListener("click", () => {
    if (firstOperand && operator && secondOperand) {
        resultDisplay.textContent = operate(
            firstOperand,
            operator,
            secondOperand
        );
        firstOperand = operator = secondOperand = "";
    }
});
