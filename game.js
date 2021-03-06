var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var highestLevel=0;
var started=false;

// Keypress
$("#start").click(function(event){
  if(!started){
    $("#level-title").text("Level "+level);
    $("#start").text("");
    nextSequence();
    started=true;
  }

});


// Button clicked
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

// function for random colour
function nextSequence(){

  userClickedPattern=[];
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour= buttonColours[randomNumber];

 gamePattern.push(randomChosenColour);
 $("#"+randomChosenColour).fadeOut(500).fadeIn(500);

 playSound(randomChosenColour);

 $("#level-title").text("Level "+level);

}


// Play the sound from the keyboard/function
function playSound(name){
  var audio = new Audio("sounds/"+name+'.mp3');
  audio.play();
}

// Animation + Timeout
function animatePress(currentColour){
  var classColour= $("."+currentColour)
  $(classColour).addClass("pressed");

  setTimeout(function(){
    $(classColour).removeClass("pressed");
  },100)
}



function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){

    console.log("success");

    if (userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence()
      },1000)
    }

  }else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $('h1').text("Game Over!");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },2000)

    highestScore();
    lastScore();
    startOver();
  }
}

function startOver(){
  started=false;
  level=0;
  gamePattern=[];
  $("#start").text("RESTART");
}

function highestScore(){
  if (level>highestLevel){
    highestLevel=level;
    $("#highest-score").text("Highest score: "+highestLevel);
  }
}

function lastScore(){
  $("#last-score").text("Last score: "+level);
}
