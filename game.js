var buttonColours = new Array("red", "blue", "green", "yellow");
var gamePattern = [];
var level = 0;
var userClickedPattern = [];

function nextSequence(){
  userClickedPattern = []
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  level++;
  $("h1").text("Level "+level);
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
}

function playsound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).toggleClass("pressed");
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(currentLevel === (gamePattern.length - 1)){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    $("h1").text("Game Over!! press any key to start again!!");
    level  = 0;
    gamePattern = [];
    $("body").addClass("game-over");
    var audio = new Audio("sounds/wrong.mp3");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);
    audio.play();
  }
}

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  setTimeout(function(){
    animatePress(userChosenColor);
  },50);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function(){
  if(level == 0){
    nextSequence();
  }
});
