var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

// Keypress
$(document).keydown(function(event){
  if(!started){
    $("#level-title").text("Level "+level);
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
 $("#"+randomChosenColour).fadeOut(50).fadeIn(50);

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
    $('h1').text("Game Over! Press any key to restart.")
    setTimeout(function(){
      $("body").removeClass("game-over");
    },2000)
    startOver();
  }
}

function startOver(){
  started=false;
  levels=0;
  gamePattern=[];
}
