let buttons = document.querySelector("#buttons");
let screen = document.querySelector("#screen");

let formula = [];
let formulaSlices = [[]];
let sliceCount = 0;
let integerStack = [];
let operatorStack = [];
let lastInputIsOperator = false;
let lastResult;
let bufferResult;

// Reads inputs and determins appropriate operation
let parser = (operator, x, y) => {
    switch (operator) {
        case "+":
            lastResult = x + y;
            return;
        case "-":
            lastResult = x - y;
            return;
        case "*":
            lastResult = x * y;
            return;
        case "/":
            lastResult = x / y;
            return;
    }
}

// Resets arrays / Cancels operation
let reset = () => {
    console.log("C");
    sliceCount = 0;
    formula = [];
    formulaSlices = [[]];
    integerStack = [];
    operatorStack = [];
    screen.innerHTML = "0";
}

buttons.addEventListener("click", (e) => {

    if (e.target.id === "C") {
        reset();
    }
    if (e.target.id !== "=" && e.target.id !== "C" && e.target.id !== "buttons") {
        formula.push(e.target.id);

        let displayString = formula.join("");
        displayString = displayString.replace("*", "&#0215;");
        displayString = displayString.replace("/", "&#0247;");
        screen.innerHTML = displayString;

        // Integer input
        if (
            e.target.id !== "+" &&
            e.target.id !== "-" &&
            e.target.id !== "*" &&
            e.target.id !== "/"
        ) {
            formulaSlices[sliceCount].push(e.target.id);
        }

        // Operator input
        if (
            e.target.id === "+" ||
            e.target.id === "-" ||
            e.target.id === "*" ||
            e.target.id === "/") {
            console.log(formulaSlices)
            if (bufferResult !== null) {
                formulaSlices.push([])
                formulaSlices[sliceCount].push(bufferResult);
                bufferResult = null;
                sliceCount += 1;
            }
            formulaSlices.push([]);
            sliceCount += 1;
            formulaSlices[sliceCount].push(e.target.id);
            formulaSlices.push([]);
            sliceCount += 1;
        }

    } else if (e.target.id === "=") {

        // Calculate!!! 
        for (i = 0; i < formulaSlices.length; i++) {
            if (Number.isInteger(parseInt(formulaSlices[i][0])) === true) {
                integerStack.push(parseInt(formulaSlices[i].join("")));
                console.log(integerStack)
            } else if (
                formulaSlices[i][0] === "+" ||
                formulaSlices[i][0] === "-" ||
                formulaSlices[i][0] === "*" ||
                formulaSlices[i][0] === "/"
            ) {
                operatorStack.push(formulaSlices[i].toString());
            }
        }

        // initial calculation
        parser(operatorStack[0], integerStack[0], integerStack[1])

        // stacked calculation
        if (operatorStack.length > 1) {
            for (i = 2; i < integerStack.length; i++) {
                parser(operatorStack[i - 1], lastResult, integerStack[i]);
                bufferResult = lastResult;
                reset();
                screen.innerHTML = lastResult;
            }
        } else {
            bufferResult = lastResult;
            reset();
            screen.innerHTML = lastResult;
        }
    }
})