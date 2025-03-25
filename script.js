let runningTotal = 0;
let buffer = "";
let previousOperator = null;
let waitingForOperand = false;
const screen = document.querySelector('.screen');

function buttonclick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer || runningTotal.toString();
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = "";
            runningTotal = 0;
            previousOperator = null;
            waitingForOperand = false;
            screen.innerText = "0";
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            waitingForOperand = false;
            break;
        case '←':
            buffer = buffer.length > 1 ? buffer.slice(0, -1) : "";
            break;
        case '÷':
        case '×':
        case '+':
        case '−':  
            handleMath(symbol);
            break;
        case '-': 
            if (buffer === "") {
                buffer = "-";
            } else {
                handleMath(symbol);
            }
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "" || buffer === "-") return;
    
    const intBuffer = parseFloat(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = "";
}

function flushOperation(intBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += intBuffer;
            break;
        case '-':
        case '−': 
            runningTotal -= intBuffer;
            break;
        case '×':
            runningTotal *= intBuffer;
            break;
        case '÷':
            runningTotal = intBuffer !== 0 ? runningTotal / intBuffer : "Error";
            break;
    }
}

function handleNumber(numberString) {
    if (buffer === "Error") {
        buffer = numberString;
    } else if (waitingForOperand) {
        buffer = numberString;
        waitingForOperand = false;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelectorAll('.calc-button').forEach(button => {
        button.addEventListener('click', function () {
            buttonclick(this.innerText);
        });
    });
}

init();