// Declare variables
var queryUrl = "https://opentdb.com/api.php?amount=10&category=26&difficulty=medium&type=multiple"
var selectedAnswer = "";
var triviaQuestionCount = 0;
var correctAnswer;
var trivia;
var answers = [];
var correct = 0;
var wrong = 0;
var interval;
var instance = M.FormSelect.getInstance("option");

// jQuery Selector variables
var question = $("#question");
var answerButton = $(".answers");
var answer1 = $("#answer1");
var answer2 = $("#answer2");
var answer3 = $("#answer3");
var answer4 = $("#answer4");
var nextQuestion = $("#nextQuestion");
var timerPlace = $("#timer");
var checkAnswer = $("#checkAnswer");
var wrongCount = $("#wrongCount");
var correctCount = $("#correctCount");
var wrongAnswerArea = $("#wrongAnswerArea");
var correctAnswerArea = $("#correctAnswerArea")
var winPic = $("#winPic");
var losePic = $("#losePic");
var winLossHide = $(".winLossHide");
var triviaOptions = $("#triviaSelect");

//Materialize initialization
  M.AutoInit();

//Set Question/Answers
function createTrivia() {
    // console.log("Making trivia");
//Shuffles the answer array randomly
        function shuffle(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            };
            return a;
    };
  var questionNumber = triviaQuestionCount + 1;
  if (triviaQuestionCount <= 9) {
  correctAnswer = trivia.results[triviaQuestionCount].correct_answer;
  answers = trivia.results[triviaQuestionCount].incorrect_answers;
  answers.push(trivia.results[triviaQuestionCount].correct_answer);
  shuffle(answers);
  question.html(questionNumber + ". " + trivia.results[triviaQuestionCount].question);
  answer1.html(answers[0]);
  answer2.html(answers[1]);
  answer3.html(answers[2]);
  answer4.html(answers[3]);
  timer();
//   console.log(correctAnswer);
  triviaOptions.hide();
  winLossHide.show();
  }
};


// Question and answers as JSON
function getInfo() {
 $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(info) {
    //   console.log("Getting Info");
      trivia = info;
      createTrivia();
  });   
};

$(document).on("change", "#triviaSelect select", function(event) {
    selectedAnswer;
    triviaQuestionCount = 0;
    correctAnswer;
    trivia;
    answers = [];
    correct = 0;
    wrong = 0;
    interval;
    // console.log(event);
    // console.log(this);
    // console.log(this.value);
    var value = this.value
    switch(value) {
        //gen knowledge
        case "1":
        queryUrl = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
        break;
        //books
        case "2":
        queryUrl = "https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple"
        break;
        //video games
        case "3":
        queryUrl = "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple"
        break;
        //computer science
        case "4":
        queryUrl = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
        break;
        //television
        case "5":
        queryUrl = "https://opentdb.com/api.php?amount=10&category=14&difficulty=medium&type=multiple"
        break;
    }
    getInfo();
    checkAnswer.show();
});

// Timer for questions
function timer() {
    // var hour = 2;
    var sec = 30; //30 seconds per question
    interval = setInterval(function() {
      timerPlace.text(sec);
      sec--;
      if (sec === -1) { //timer will hit 0 by using -1
        selectedAnswer = "**wrong**"
          clearInterval(interval);
          checkInput();
      };
    //   setInterval();
    //   if (sec == 00) {
    //     hour--;
    //     sec = 60;
    //     if (hour == 0) {
    //       hour = 2;
    //     }
    //   }
    },1000);
  };

  //Record the answer input
answerButton.on("click", function(event) {
    selectedAnswer = $(this).html();
});

  //Game end function
  function gameEnd() {
      if (triviaQuestionCount > 9) {
        triviaOptions.show();
        winLossHide.hide();
        clearInterval(interval);
        timerPlace.text("");
        question.html("Want to play again? Select your next category!");
        checkAnswer.hide();
        wrongAnswerArea.empty();
        correctAnswerArea.empty();
      }
  }

  //Show answer and stop taking input
// function showAnswer() {
//     if (answer1.text() ==  correctAnswer) {
//             answer1.animate({textColor: "red"}, 1000 * 5);
//     } 
//     else if (answer2.text() == correctAnswer) {
//             answer2.animate({textColor: "red"}, 1000 * 5);
//     } 
//     else if (answer3.text() == correctAnswer) {
//             answer3.animate({textColor: "red"}, 1000 * 5);
//     } 
//     else if (answer4.text() == correctAnswer) {
//             answer4.animate({textColor: "red"}, 1000 * 5);

//     }
// };
// Show pic if answer is correct
function showCorrectPic() {
    winLossHide.hide();
    winPic.show();
    setTimeout(function() {
        winLossHide.show();
        winPic.hide();
        nextQuestionFunc();
    }, 1000 * 4)
};

// show pic if answer is wrong
function showWrongPic() {
    winLossHide.hide();
    losePic.show();
    setTimeout(function() {
        winLossHide.show();
        losePic.hide();
        nextQuestionFunc();
    }, 1000 * 4)
};

  //Answer Right or wrong
  function checkInput() {
      if (selectedAnswer == "") {

      }
      else if (selectedAnswer.replace(/[^a-z0-9\s]/gi, '') == correctAnswer.replace(/[^a-z0-9\s]/gi, ''))
      {
          console.log("Selected: " + selectedAnswer.replace(/[^a-z0-9\s]/gi, ''));
          console.log("Correct: " + correctAnswer.replace(/[^a-z0-9\s]/gi, ''));
          correct ++;
          correctAnswerArea.append("<p>Q: " + trivia.results[triviaQuestionCount].question + "<br/>A: " + trivia.results[triviaQuestionCount].correct_answer);
          correctCount.text(correct);
          nextQuestion.show();
          triviaQuestionCount++;
          showCorrectPic();
          clearInterval(interval);

      } 
      else if (selectedAnswer.replace(/[^a-z0-9\s]/gi, '') != correctAnswer.replace(/[^a-z0-9\s]/gi, '')) 
      {
        console.log("Selected: " + selectedAnswer.replace(/[^a-z0-9\s]/gi, ''));
        console.log("Correct: " + correctAnswer.replace(/[^a-z0-9\s]/gi, ''));
          wrong++;
          wrongAnswerArea.append("<p>Q: " + trivia.results[triviaQuestionCount].question + "<br/>A: " + trivia.results[triviaQuestionCount].correct_answer);
          wrongCount.text(wrong);
          nextQuestion.show();
          triviaQuestionCount++;
          showWrongPic();
          clearInterval(interval);
      }
  };
//Next question function
function nextQuestionFunc() {
    clearInterval(interval);
    createTrivia();
    selectedAnswer = "";
    nextQuestion.hide();
    winLossHide.show();
    winPic.hide();
    losePic.hide()
    gameEnd();
};
//Next question
// nextQuestion.on("click", function(event){
//     nextQuestionFunc();
// });


// Logic to figure out if answer is right or wrong
checkAnswer.on("click", function(event) {
    if (selectedAnswer === "") {
//Do nothing if no answer is selected
    } 
    else {
    checkAnswer.attr("disabled", "true"); //Prevents from repeated clicks and false "wrongs"
    checkInput();
    setTimeout(function() {
        checkAnswer.removeAttr("disabled"); //Button can be used again
    }, 1000 * 4);
    }
});