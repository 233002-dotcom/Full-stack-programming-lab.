// Store correct answers in variables
var answer1 = "10";
var answer2 = "islamabad";
var answer3 = "javascript";

// Function to check answers and calculate score
function checkQuiz() {

    // Get user inputs
    var user1 = document.getElementById("q1").value.toLowerCase();
    var user2 = document.getElementById("q2").value.toLowerCase();
    var user3 = document.getElementById("q3").value.toLowerCase();

    // Calculate score
    var score = 0;

    if (user1 === answer1) {
        score++;
    }

    if (user2 === answer2) {
        score++;
    }

    if (user3 === answer3) {
        score++;
    }

    // Conditional message based on score
    var message = "";
    var resultClass = "";

    if (score === 3) {
        message = "Excellent! Perfect Score! 🎉";
        resultClass = "good";
    } else if (score === 2) {
        message = "Good Job! Almost there! 👏";
        resultClass = "average";
    } else if (score === 1) {
        message = "Keep Practicing! You can do it! 😊";
        resultClass = "average";
    } else {
        message = "Try Again! No correct answers. ❌";
        resultClass = "poor";
    }

    // Display result using DOM
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Your Score: " + score + " / 3 <br>" + message;
    resultDiv.className = resultClass;
}

// Function to reset the quiz
function resetQuiz() {

    document.getElementById("q1").value = "";
    document.getElementById("q2").value = "";
    document.getElementById("q3").value = "";

    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    resultDiv.className = "";
}
