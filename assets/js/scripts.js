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

  {
  question: "What is my dogs name?",
  choices: ["Jeter", "Stinky", "Boots", "Ace"],
  answer: 0,
  },

  {
  question: "Who is the best coding teacher?",
  choices: ["Julia", "Will", "Aaron", "Gary"],
  answer: 3,
  },

  {
  question: "What do you use to add dynamic elements?",
  choices: ["HTML", "CSS", "JavaScript", "Not Sure"],
  answer: 2,
  },

  {
  question: "Who is the best coding student?",
  choices: ["Trey", "Kayla", "Will", "Ryan"],
  answer: 2,
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
      document.getElementById("question-holder").style.display = "none";
      storeHighScore();
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
  var header = document.createElement("h2");
  header.textContent = arr.question
  parentElement.appendChild(header);

  for (var i = 0; i < arr.choices.length; i++) {
    var element = document.createElement("button");

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
  localStorage.setItem("highScore", secondsRemaining);
  localStorage.setItem("initials", initials);
}

// Function for high score display
function displayHighScore() {
  document.getElementById("question-holder").style.display = "none";
  clearInterval(timerInterval);

}



// Event listener for timer start
startButton.addEventListener("click", function () {
  document.getElementById("start-button").style.display = "none";
  startQuiz();
});

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
      displayHighScore();
      storeHighScore();
    }
  }
});
