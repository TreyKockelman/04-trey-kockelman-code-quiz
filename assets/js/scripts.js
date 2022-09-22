// Global Variables

//variables updating html

var timerText = document.querySelector(".quiz-seconds"); // assigning variable of timerText to the class of "quiz-seconds" in the html

var startButton = document.querySelector("#start-button"); // assigning variable of startButton to the class of "start-button" in the html

var secondsRemaining = 90;
var timerInterval;

var highScore = localStorage.getItem("highScore");
var initials = localStorage.getItem("initials");

var buttonHolder = document.querySelector("#question-holder");

var questionIndex = 0; // Tells us what question we are currently on

var questions = [
  {
  question: "What is my first name?",
  choices: ["Trey", "John", "Sally", "Fred"],
  answer: 0,
  },

  {
  question: "What is my last name?",
  choices: ["Jones", "Kockelman", "Brooks", "Mickelson"],
  answer: 1,
  },
]


// Functions

// Function for timer
function startQuiz() {
  timerInterval = setInterval (function () {
    secondsRemaining--; // ticks timer down 1
    timerText.textContent = "Timer: " + secondsRemaining + " seconds remaining"; // sets the content of the text on the timer to whatever is left
    if (secondsRemaining === 0) {
      clearInterval(timerInterval); // clears interval when timer hits zero
    } 
  }, 1000); // sets interval tick to 1 second
  displayQuestions(questions[questionIndex]);
};

// Function for Scrolling Questions
function displayQuestions(question) {
  clearElement(document.getElementById("question-holder"));
  addElements(question, document.getElementById("question-holder"));
}

function clearElement(element) {
  while (element.firstChild){
    element.removeChild(element.firstChild);
  }
}

function addElements(arr, parentElement) {
  for (var i = 0; i < arr.choices.length; i++) {
    var element = document.createElement("button");
    console.log(i);

    if (i == arr.answer) {
      element.setAttribute("data-ans", "yes");
    }
    element.textContent = arr.choices[i];
    parentElement.appendChild(element);
  }
}

// Function to subtract time from timer on wrong score
function wrongAnswer() {
  secondsRemaining -= 10;
}

function correctAnswer() {
  // highScore += 1;
}

function hasQuestions() {
  if ((questionIndex + 1) === questions.length) {
    return false;
  }
  return true;
}

// Store High Scores
function storeHighScore() {
  var highScore = 0;
  var initials = "";
  localStorage.setItem("highScore", highScore);
  localStorage.setItem("initials", initials);
}

// Function for high score display



// Event listener for timer start
startButton.addEventListener("click", function () {
  document.getElementById("start-button").style.display = "none";
  startQuiz();
})

// listening for button click on answer to questions
buttonHolder.addEventListener("click", function (evt) {
  if (evt.target.matches("button")) {
    console.log(questions.length, questionIndex)
    if (hasQuestions()) {
      if (evt.target.dataset.ans) {
        correctAnswer();
      } else {
        wrongAnswer();
      }
      questionIndex++;
      displayQuestions(questions[questionIndex]);
    } else {
      console.log("quiz over");
    }
  }
})
