//This is the starting value of my timer
var counter = 30;
//This is a count to remember the current question
var currentQuestion = 0;
//This is my score i.e. questions right
var score = 0;
//This is the number of question wrong
var lost = 0;
//This will hold my timing function when it's started
var timer;
//Here is the logic for my next q   uestion
function nextQuestion() {
   //This will generate a false value if there are more questions otherwise it will generate a true value
const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
console.log(isQuestionOver);
   //If the value is true, end the game and tally scores
   if (isQuestionOver) {
       console.log("Game is over!!!!");
       displayResult();
       //if it is false, keep asking questions
   } else {
       currentQuestion++;
       loadQuestion();
   }
}
//this function handles my timer and moving to the next question if we dont answer
function timeUp() {
   //clearing current interbval so we can restart
   clearInterval(timer);
   //by default they got a wrong answer
   lost++;
   preloadImage("lost")
   //reset timer for next quesiton
   setTimeout(nextQuestion, 3 * 1000);
}
//This function starts our timer
function countDown() {
   //setting our counter value to decrement by one on each instance
   counter--;
   //targetting our timer and writing html value of our counter to that timer
   $("#time").html("Timer: " + counter);
   //end condition
   if (counter === 0) {
      //calling the funciton to handle running out of time
       timeUp();
   }
}
//This function handles the next question
function loadQuestion() {
   //resetting counter to 30
   counter = 30;
   //setting our interval for countdown
   timer = setInterval(countDown, 1000);
   //get the correct next question and choice, then print them to the page/DOM
   const question = quizQuestions[currentQuestion].question;
   const choices = quizQuestions[currentQuestion].choices;
   $("#time").html("Timer:" + counter);
   $("#game").html(`
   <h4>${question}</h4>
   ${loadChoices(choices)}
   ${loadRemainingQuestion()}
   `);
}
//This function handles loading the choices
function loadChoices(choices) {
   //This is our anchor for holding the choices options
   var result = "";
   //We create html for each choice and add it to the resulkt variable
   for (var i = 0; i < choices.length; i++) {
       result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
   }
   //This makes our result available to the rest of our script
   return result;
}
//Onclick for handling choice
$(document).on("click", ".choice", function () {
   //Clear timer
   clearInterval(timer);
   //Get users answer
   const selectedAnswer = $(this).attr("data-answer");
   //get the correct answer
   const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
   //check to see if the correct answer and the selected answer are equakl
   if (correctAnswer === selectedAnswer) {
      //What we do if they're correct
       score++;
       console.log("win!");
       preloadImage("win");
       setTimeout(nextQuestion, 3 * 1000);
   } else {
      //what we do if they fail
       lost++;
       console.log("lost!");
       preloadImage("lost");
       setTimeout(nextQuestion, 3 * 1000);
   }
});
//This functions handles showing the user the results
function displayResult() {
   //Here is the html and javascript to put together the tags
   const result = `
   <p>You get ${score} questions(s) right</p>
   <p>You missed ${lost} questions(s)</p>
   <p>Total questions ${quizQuestions.length} questions(s) right</p>
   <button class=“btn btn-primary” id=“reset”>Reset Game</button>
   `;
   //Here is where we add the result to the page as HTML
   $("#game").html(result);
}
//This function listend to our reset button and starts the game over
$(document).on("click", "#reset", function () {
   counter = 30;
   currentQuestion = 0;
   score = 0;
   lost = 0;
   timer = null;
   loadQuestion();
});
//This function handles bring us the remaining questions
function loadRemainingQuestion() {
   //Get the remaining questions but subtracting the currentquestion's index+1
   const loadRemainingQuestion = quizQuestions.length - (currentQuestion + 1);
   //Number representing total questions left
   const totalQuestion = quizQuestions.length;
   //Return how many questions are left/total
   return `Remaining Question: ${loadRemainingQuestion}/${totalQuestion}`;
}
//Trying to add visuals, please ignore
// function randomImage(images) {
//    const random = Math.floor(Math.random() * images.length);
//    const randomImage = images[random];
//    return randomImage;
// }
//This function gives the user their results for the specific question
function preloadImage(status) {
   
   const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
   if (status === "win") {
       $("#game").html(`
   <p class=“preload-image”>Congratulations, you pick the correct answer</p>
   <p class=“preload-image”>The correct answer is <b>${correctAnswer}</b></p>
   
   `);
   } else {
       $("#game").html(`
       <p class=“preload-image”>The correct answer was: <b>${correctAnswer}</b></p>
        <p class=“preload-image”>You lost</p>
      
   `);
   }
}

//Here is out onclick that handles starting our game and the timer for the first time
$("#start").click(function(){
   //Remove the start id so we can run our gamne
   $("#start").remove();
   //Add the timer html to the time id
   $("#time").html(counter);
   //Run the sequence for giving our questions and generating them to the page
   loadQuestion();
});


