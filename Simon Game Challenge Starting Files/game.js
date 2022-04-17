buttonColours=["red","blue","green","yellow"]
var gamePattern=[]
var userClickedPattern=[]
var level=0
var started = false;


$(document).keypress(function() {
    if (!started) {
  
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    console.log(userClickedPattern)
    animatePress(userChosenColour)
    $("#level-title").text("level "+level)
    checkAnswer(userClickedPattern.length-1)
})

function nextSequence(){
    userClickedPattern = [];
    level++
    var randomNumber= Math.floor(Math.random() * 3+1);
    var randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
   
        $("#"+currentColor).addClass("pressed")

        setTimeout(()=>{
            $("#"+currentColor).removeClass("pressed"),100
        })
}

function startOver(){
level=0
gamePattern=[]
started=false
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
console.log("true")
if (userClickedPattern.length === gamePattern.length){

    setTimeout(function () {
      nextSequence();
    }, 1000);

  }

    }else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over")
    setTimeout(()=>{
        $("body").removeClass("game-over"),200
    })
    $("#level-title").text("Game Over, Press Any Key to Restart")
    startOver()
    }
}







