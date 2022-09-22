// Global Variables

//variables updating html

var timerText = document.querySelector(".quiz-seconds"); // assigning variable of timerText to the class of "quiz-seconds" in the html

var startButton = document.querySelector("#start-button"); // assigning variable of startButton to the class of "start-button" in the html

var buttons = document.querySelectorAll("button"); // assigning variable of button to all buttons

var secondsRemaining = 90;
var timerInterval;

var highScore = localStorage.getItem("highScore");
var initials = localStorage.getItem("initials");


var questions = [
  {
  question: "What is my first name?",
  choices: ["Trey", "John", "Sally", "Fred"],
  answer: "Trey",
  },

  {
  question: "What is my last name?",
  choices: ["Jones", "Kockelman", "Brooks", "Mickelson"],
  answer: "Kockelman",
  },
]


// Functions

// Function for timer
function tickTimer() {
  timerInterval = setInterval (function () {
    secondsRemaining--; // ticks timer down 1
    timerText.textContent = "Timer: " + secondsRemaining + " seconds remaining"; // sets the content of the text on the timer to whatever is left
    if (secondsRemaining === 0) {
      clearInterval(timerInterval);
    } // clears interval when timer hits zero
  }, 1000); // sets interval tick to 1 second
};

// Function for Scrolling Questions
function displayQuestions() {
  for (var i = 0; i < questions.length; i++) {
    var quizSection = document.createElement("section");
    var quizQuestion = document.createElement("h2");
    var answerHolder = document.createElement("ul");
    var answerList = document.createElement("li");
    var answer1 = document.createElement("button");
    var answer2 = document.createElement("button");
    var answer3 = document.createElement("button");
    var answer4 = document.createElement("button");
    quizQuestion.textContent = questions[i].question
    answer1.textContent = questions[i].choices[0];
    answer2.textContent = questions[i].choices[1];
    answer3.textContent = questions[i].choices[2];
    answer4.textContent = questions[i].choices[3];
    document.body.appendChild(quizSection);
    quizSection.appendChild(quizQuestion);
    quizSection.appendChild(answerHolder);
    answerHolder.appendChild(answerList);
    answerList.appendChild(answer1);
    answerList.appendChild(answer2);
    answerList.appendChild(answer3);
    answerList.appendChild(answer4);
  }
}

// Function to subtract time from timer on wrong score
function wrongAnswer() {
  secondsRemaining -= 10;
}

// Store High Scores
function storeHighScore() {
  var highScore = 0;
  var initials = "";
  localStorage.setItem("high-score", highScore);
  localStorage.setItem("initials", initials);
}

// Function for high score display



// Event listener for timer start
startButton.addEventListener("click", function () {
  document.getElementById("start-button").style.display = "none";
  tickTimer();
  displayQuestions();
  // storeHighScore();
})

// listening for button click on answer to questions (THIS ISNT WORKING AFTER INITIAL CLICK)
buttons.addEventListener("click", function () {
  console.log("click")
})
