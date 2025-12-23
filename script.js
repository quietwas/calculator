function add(a, b){
    return a + b
}
function subtract(a, b){
    return a - b
}
function multiply(a, b){
    return a * b
}
function divide(a, b){
    if (b == 0) return "You really thought that would work?"
    return Math.round((a / b) * 100) / 100;
}

function operate(operator, a, b){
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '\u00D7':
            return multiply(a, b)
        case '\u002B':
            return add(a, b)
        case '\u2212':
            return subtract(a, b)
        case '\u00F7':
            return divide(a, b)
    }
}

// Display number on button press
const display = document.querySelector(".screen")

let a = ""
let b = ""
let operator = ""
let operated = false

function updateScreen(button){
    const operators = ['\u00D7', '\u002B', '\u2212', '\u00f7']
    const equalSign = "="
    const decimal = "."
    const DELETE = "DELETE"
    const CLEAR = "CLEAR"

    const currentScreen = display.textContent
    const btnText = button.textContent

    if(operators.includes(btnText)){
        if (!currentScreen) return;
        if (!a) a = currentScreen
        else if (!b) b = currentScreen
        if (a && b && operator) {
            console.log(`${a} ${operator} ${b}`)
        }
        operator = btnText
        display.textContent = ""
    }

    if(operators.includes(currentScreen)){
        display.textContent = ""
    }

    if(equalSign.includes(btnText)){
        if (!currentScreen) return;
        if (operator) b = currentScreen
        if (a && b && operator) {
            display.textContent = ""
            display.textContent = operate(operator, a, b)
            a = ""
            b = ""
            operator = ""
            operated = true
        }
    }

    if(!equalSign.includes(btnText) && !operators.includes(btnText) && operated){
        operated = false
        display.textContent = btnText
    }
    else if (!equalSign.includes(btnText)) display.textContent += btnText
}

const buttons = document.querySelectorAll("button")
buttons.forEach(button => {
    button.addEventListener('click', () => {
        updateScreen(button)
    })
});


