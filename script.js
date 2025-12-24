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
const topDisplay = document.querySelector(".top")
const bottomDisplay = document.querySelector(".bottom")

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

    const currentScreen = bottomDisplay.textContent
    const btnText = button.textContent

    if(operators.includes(btnText)){
        if (!currentScreen) return

        if (currentScreen == "You really thought that would work?") return

        if (a === "") { 
            a = currentScreen
            if (a == "You really thought that would work?") a = ""
            operator = btnText
            
            topDisplay.textContent = `${a} ${operator}`
            
            bottomDisplay.textContent = operator
            return
        }

        if (operators.includes(currentScreen)) {
            operator = btnText
            bottomDisplay.textContent = operator
            
            topDisplay.textContent = `${a} ${operator}`
            return
        }

        if (operator) {
            b = currentScreen
            a = operate(operator, a, b)

            if (a == "You really thought that would work?") {
                bottomDisplay.textContent = a
                a = ""
                operated = true
                topDisplay.textContent = ""
                return
            }

            topDisplay.textContent = `${a} ${btnText}`

            operated = true
            operator = btnText
            b = ""
            bottomDisplay.textContent = operator
        }
    }

    if(operators.includes(currentScreen)){
        bottomDisplay.textContent = ""
    }

    if(equalSign.includes(btnText)){
        if (!currentScreen && operated){
            bottomDisplay.textContent = a
            topDisplay.textContent = ""
        }
        else if (!currentScreen) return
        if (operator) b = currentScreen
        if (a && b && operator) {
            bottomDisplay.textContent = ""
            bottomDisplay.textContent = operate(operator, a, b)
            a = ""
            b = ""
            operator = ""
            operated = true
        }
        if (topDisplay) topDisplay.textContent = ""
    }

    if(!equalSign.includes(btnText) && !operators.includes(btnText) && operated){
        operated = false
        bottomDisplay.textContent = btnText
    }
    else if (!equalSign.includes(btnText) && !operators.includes(btnText)) bottomDisplay.textContent += btnText
}

const buttons = document.querySelectorAll("button")
buttons.forEach(button => {
    button.addEventListener('click', () => {
        updateScreen(button)
    })
});


