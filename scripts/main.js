let add = (a, b) => a + b;
let substract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => {
    if (b === 0) {
        return "ERROR";
        firstOperand = operator = secondOperand = "";
    }
    return a / b;
};
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
const decimalButton = calculator.querySelector(".calculator__decimal");

function updateDisplay() {
    const clearFirstOperand =
        firstOperand.length > 9
            ? String(parseInt(firstOperand).toExponential(2))
            : firstOperand;
    const clearSecondOperand =
        secondOperand.length > 9
            ? String(parseInt(secondOperand).toExponential(2))
            : secondOperand;

    userInputDisplay.textContent = `${clearFirstOperand} ${operator} ${clearSecondOperand}`;
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
            if (
                typeof operate(firstOperand, operator, secondOperand) !==
                "number"
            ) {
                firstOperand = operator = secondOperand = "";
                updateDisplay();

                resultDisplay.textContent = "ERROR";
            } else {
                firstOperand = operate(firstOperand, operator, secondOperand);
                operator = operatorButton.value;
                secondOperand = "";
                updateDisplay();
            }
        } else if (firstOperand) {
            operator = operatorButton.value;
            updateDisplay();
        }
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
        const result = String(operate(firstOperand, operator, secondOperand));
        resultDisplay.textContent =
            result.length > 9
                ? String(parseInt(result).toExponential(2))
                : result;
        firstOperand = operator = secondOperand = "";
    }
});

decimalButton.addEventListener("click", () => {
    if (secondOperand && !secondOperand.includes(".")) {
        secondOperand = secondOperand + ".";
    }
    if (firstOperand && !firstOperand.includes(".")) {
        firstOperand = firstOperand + ".";
    }
    updateDisplay();
});

// Keyboard support
const clickEvent = new Event("click", { bubbles: true, cancelable: true });
function keyboardHandler(key, button) {
    document.addEventListener("keyup", (e) => {
        if (e.key === key) {
            button.dispatchEvent(clickEvent);
        }
    });
}

digits.forEach((digit) => {
    keyboardHandler(digit.value, digit);
});

operatorsButtons.forEach((operatorButton) => {
    keyboardHandler(operatorButton.value, operatorButton);
    keyboardHandler(operatorButton.textContent, operatorButton);
});

keyboardHandler("Delete", allClearButton);
keyboardHandler("Backspace", clearButton);
keyboardHandler("=", calculateButton);
keyboardHandler("Enter", calculateButton);
keyboardHandler(".", decimalButton);
