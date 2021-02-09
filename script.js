

// receive inputs

let buttons = document.querySelector("#buttons");
let screen = document.querySelector("#screen");




let formula = [];
let formulaSlices = [[]];
let sliceCount = 0;

let integerStack = [];
let operatorStack = [];

let lastInputOperator = false;

let lastResult;

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

buttons.addEventListener("click", (e) => {
    
        if (e.target.id === "C") {
            console.log("C")
            integerStack = [];
            operatorStack = [];
            screen.innerHTML = "0";
        }
        console.log(e)
        if (e.target.id !== "=" && e.target.id !== "C" && e.target.id !== "buttons") {
            formula.push(e.target.id);
            screen.innerHTML = formula.join("")
    
            if (
                e.target.id !== "+" &&
                e.target.id !== "-" &&
                e.target.id !== "*" &&
                e.target.id !== "/" 
            ) {
                formulaSlices[sliceCount].push(e.target.id)
                lastInputOperator = false;
            }
            
            if (
                e.target.id === "+" ||
                e.target.id === "-" ||
                e.target.id === "*" ||
                e.target.id === "/"  ) {
                    formulaSlices.push([])
                    sliceCount += 1; 
                    formulaSlices[sliceCount].push(e.target.id)
                    formulaSlices.push([])
                    sliceCount += 1; 
                    lastInputOperator = true;
                }
                console.log(formulaSlices)
    
        } else if (e.target.id === "=") {
            
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
                        console.log(operatorStack)
                    }
                }
        
                // initial calculation
                parser(operatorStack[0], integerStack[0], integerStack[1])
               
                // stacked calculation
                if (operatorStack.length > 1) {
                    for (i = 2; i < integerStack.length; i++) {
                        console.log(operatorStack[i - 1])
                        console.log(lastResult)
                        console.log(integerStack[i])
            
                        parser(operatorStack[i - 1], lastResult, integerStack[i])
                        console.log(lastResult)
                        screen.innerHTML = lastResult;
        
                    }
                } else {
                    console.log(lastResult)
                    screen.innerHTML = lastResult;
    
                }
            
            
    
            // slice
            // join strings of numbers
            // parseInt()
            // separate at operators
            // detect type of operators
            // apply and display calculation
    
        } 
    


    
})



// addListeners();
// split and store inputs
// apply calculations
// display output



