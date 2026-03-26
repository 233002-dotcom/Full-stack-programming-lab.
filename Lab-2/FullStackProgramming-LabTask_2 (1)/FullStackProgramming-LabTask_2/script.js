// Function to calculate result
function calculate() {

    // Get user inputs
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    var operator = document.getElementById("operator").value;

    // Input validation - check if fields are empty
    if (num1 === "" || num2 === "") {
        var resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "Please enter both numbers!";
        resultDiv.className = "error";
        return;
    }

    // Convert to numbers
    var a = parseFloat(num1);
    var b = parseFloat(num2);

    var result;

    // Perform operation using if-else
    if (operator === "add") {
        result = a + b;
    } else if (operator === "sub") {
        result = a - b;
    } else if (operator === "mul") {
        result = a * b;
    } else if (operator === "div") {

        // Division by zero check
        if (b === 0) {
            var resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Error! Cannot divide by zero.";
            resultDiv.className = "error";
            return;
        }
        result = a / b;
    }

    // Display result using DOM
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Result: " + result;

    // Change background color based on positive or negative value
    if (result > 0) {
        resultDiv.className = "positive";
    } else if (result < 0) {
        resultDiv.className = "negative";
    } else {
        resultDiv.className = "zero";
    }
}

// Function to reset the calculator
function resetCalc() {

    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("operator").value = "add";

    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    resultDiv.className = "";
}
