let runningTotal = 0;
let buffer = "";
let previousOperator = null;
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
            break;
        case '=':
            if (previousOperator === null) {
                if (buffer !== "") {
                    runningTotal = parseInt(buffer);
                }
                buffer = runningTotal.toString();
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            break;
        case '←':
            buffer = buffer.length > 1 ? buffer.slice(0, -1) : "";
            break;
        case '+':
        case '-':
        case '×':
        case '÷':  
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "") return;
    
    const intBuffer = parseInt(buffer);
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
            runningTotal -= intBuffer;
            break;
        case '×':
            runningTotal *= intBuffer;
            break;
        case '÷':
            if (intBuffer === 0) {
                alert("Error: Cannot divide by zero");
                runningTotal = 0;
                return;
            }

            runningTotal = Math.floor(runningTotal / intBuffer);
            break;
    }
}

function handleNumber(numberString) {
  
    buffer = buffer === "0" 
        ? numberString 
        : buffer + numberString;
}

function init() {
    document.querySelectorAll('.calc-button').forEach(button => {
        button.addEventListener('click', function () {
            buttonclick(this.innerText);
        });
    });
}

init();