// Create variable with array  of objects including following properties:question, answerList, and answer
var triviaQuestions = [ {
	question : "Which player has the most regular season MVPs in NFL history?",
	answerList : ["Peyton Manning", "Tom Brady", "Brett Favre", "Jim Brown"],
	answer: 0
}, {
	question : "How many times has the host country won the World Cup?",
	answerList : ["4", "8", "6", "3"],
	answer: 2
}, {
	question : "Who scored an NBA record 100 points in a single game?",
	answerList : ["Wilt Chamberlain", "Michael Jordan", "Kobe Bryant", "Larry Bird"],
	answer: 0
}, {
	question : "Who holds the NFL single season rushing yards record?",
	answerList : ["Adrian Peterson", "Eric Dickerson", "O.J. Simpson", "Jim Brown"],
	answer: 1
}, {
	question : "Which player has the most home runs in MLB history?",
	answerList : ["Hank Aaron", "Barry Bonds", "Babe Ruth", "Sammy Sosa"],
	answer: 1
}, {
	question : "Which fighter never beat Muhammad Ali in a boxing match?",
	answerList : ["Joe Fraizer", "George Foreman", "Ken Norton","Richard Dunn"],
	answer: 3
}, {
	question : "Who is the all time Touch-Downs leader NFL history?",
	answerList : ["Emmitt Smith", "Randy Moss", "Jerry Rice", "Walter Payton"], 
	answer: 2
}, {
	question : "Which NBA player is the all time leader in points per game?",
	answerList : ["Lebron James", "Michael Jordan", "Kevin Durant", "Wilt Chamberlain"],
	answer: 1
}, {
	question : "How many gold medals does Michael Phelps have as of 2016?",
	answerList : ["20", "28", "23", "18"],
	answer: 2
}, {
	question : "How many games did Joe DiMaggio get a hit in consecutively?",
	answerList : ["55", "56", "49", "50"],
	answer: 1
}];

var gifArray = ['gif1', 'gif2', 'gif3', 'gif4', 'gif5', 'gif6', 'gif7', 'gif8', 'gif9', 'gif10'];
var currentQuestion;
var correct;
var incorrect;
var answered;
var unanswered;
var seconds;
var time;
var userChoice;
var messages = {
	correct: "Great job! You are a sports guru.",
	incorrect: "Womp womp! Get your facts straight!",
	timeUp : "You are out of time.",
	complete: "Let's see how you did."
};  

// Create button to begin game
$('#startButton').on("click", function(){
	$(this).hide();
	newGame();
});
// Restart game 
$('#restart').on("click", function(){
	$(this).hide();
	newGame();
});

// Function to begin new game
function newGame(){
	$('#gameMessage').empty();
	$('#correct').empty();
	$('#incorrect').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	incorrect = 0;
	correct = 0;
	unanswered = 0;
	nextQuestion();
}

// Function to move on to next question
function nextQuestion (){
	$('#answerMessage').empty();
	$('#answer').empty();
	$('#gif-holder').empty();
	answered = true;

	// Sets up new questions and answerList
	$('#currentQuestion').html('Question #' + (currentQuestion+1) + '/' + triviaQuestions.length);
	$('#question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for( var i=0; i<4; i++){
		var choices = $('<div></div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i});
		choices.addClass('selection');
		$('#answerList').append(choices);
	}
	countdown();
	// When player chooses answer it will pause and go to answer page
	$('.selection').on("click", function(){
		userChoice = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

// Function for question timer
function countdown(){
	seconds = 10;
	$('#timeLeft').html('<h2>Time Remaining: ' + seconds + '</h2>');
	answered = true;
	time = setInterval (countdownClock, 1000);
}

function countdownClock() {
	seconds --;
	$('#timeLeft').html('<h2>Time Remaining: ' + seconds + '</h2>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.selection').empty();
	$('#question').empty();

	// var queryURL = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

	// $.ajax({url: queryURL, method: 'GET'})
	//  .done(function(data) {
	//      var myGiphyArray = data.data;
 //       $.each(myGiphyArray, function(index, value){
 //        console.log(value);
 //        var embedUrl = value.images.original.url,
 //        newImage = $('<img>');
 //        newImage.attr('src', embedUrl);
 //        $('#gif-holder').append(newImage);
 //       });
	// });

	var correctAnsText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var correctAnsIndex = triviaQuestions[currentQuestion].answer;
	$('#gif-holder').html('<img src = "assets/images/' + gifArray[currentQuestion] + '.gif"">')
	
	if(userChoice == correctAnsIndex && answered ==true){
		correct++;
		$('#answerMessage').html(messages.correct);
	}
	else if(userChoice != correctAnsIndex && answered ==true){
		incorrect++;
		$('#answerMessage').html(messages.incorrect);
		$('#answer').html('The correct answer was: ' + correctAnsText);
	}
	else{
		unanswered++;
		$('#answerMessage').html(messages.timeUp);
		$('#answer').html('The correct answer was: ' + correctAnsText);
		answered = true;
	}

	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(score, 3000);
	}
	else{
		currentQuestion++;
		setTimeout(nextQuestion, 3000);
	}
}

function score(){
	$('#timeLeft').empty();
	$('#answerMessage').empty();
	$('#answer').empty();
	$('#gif-holder').empty();
	$('#gameMessage').html(messages.complete);
	$('#correct').html("Correct Answers: " + correct);
	$('#incorrect').html("Incorrect Answers: " + incorrect);
	$('#unanswered').html("Unanswered: " + unanswered);	
	$('#restart').addClass('reset');
	$('#restart').html('Play Again');
}