// Array to store the colors used in the game
var buttonColours = ["red", "blue", "green", "yellow"];

// Variables to keep track of game state
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var started = false;

// Function to start the game on keypress
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// Function to generate the next sequence in the game
function nextSequence() {
  level += 1;
  $("#level-title").text("Level " + level);
  $("#st").text("Love it......       Play it");
  // Generate a random color and add it to the game pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Animate and play sound for the chosen color
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);

  // Reset the user clicked pattern for the new sequence
  userClickedPattern = [];
}

// Function to play sound associated with a color
function playSound(name) {
  var audio = new Audio( name + ".mp3");
  audio.play();
}

// Function to add and remove the pressed class for animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Event handler for button clicks
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check if the user's clicked pattern matches the game pattern
  checkAnswer(userClickedPattern.length - 1); 
});

// Function to check the user's answer against the game pattern
function checkAnswer(currentLevel) {
  // Check if the last clicked color matches the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    // If the user has clicked all colors correctly, proceed to the next sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // Play wrong sound and show game over animation
    var audio = new Audio("wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Reset the game
    $("#level-title").text("Game Over, Press Any Key or 'Re-Start' to Restart");
    gamePattern = [];
    started = false;
    level = 0;
    $("#st").text("Re-Start")
  }
}
$(".mobile").click(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
})
