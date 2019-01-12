// Declare variables
var queryUrl = "https://opentdb.com/api.php?amount=10&category=26&difficulty=medium&type=multiple"
var selectedAnswer;
var triviaQuestionCount = 0;
var correctAnswer;
var answerOptions = ["1", "2", "3", "4"];
var trivia;
var answers = [];
var correct = 0;
var wrong = 0;
// jQuery Selector variables
var question = $("#question");
var btn = $(".btn");
var answer1 = $("#answer1");
var answer2 = $("#answer2");
var answer3 = $("#answer3");
var answer4 = $("#answer4");
var nextQuestion = $("#nextQuestion");

// Question and answers as JSON
$.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(info) {
      trivia = info;
      createTrivia();
  });

//Gen random answer

//Set Question/Answers
function createTrivia() {
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
  correctAnswer = trivia.results[triviaQuestionCount].correct_answer;
  answers = trivia.results[triviaQuestionCount].incorrect_answers;
  answers.push(trivia.results[triviaQuestionCount].correct_answer);
  shuffle(answers);
  question.html(trivia.results[triviaQuestionCount].question);
  answer1.html(answers[0]);
  answer2.html(answers[1]);
  answer3.html(answers[2]);
  answer4.html(answers[3]);
};
  
// Timer for questions



//Next question
nextQuestion.on("click", function(event){
    nextQuestion.hide();
    winPic.hide();
    createTrivia();
})

// Logic to figure out if answer is right or wrong
btn.on("click", function(event) {
    console.log(event);
    selectedAnswer = $("this").text();
    if (selectedAnswer == correctAnswer) {
        nextQuestion.show();
        winPic.show();
    };
    triviaQuestionCount++;
});