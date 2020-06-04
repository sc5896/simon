var sessionHighestLevel = null;
var gameSession = null;
var buttonColours = ["green","red","yellow","blue"];

$(".btn").on("click", function() {
  var color = $(this).attr("id");
  animate(color);
  playSound(color);
  checkEvent(color);
});

$(document).on("keypress", function (event) {
    if(gameSession == null || gameSession == undefined || !gameSession.isGameOn) {
      gameSession = new GameSession([],0,0);
      addRandomNextColor();
    }
	});

function addRandomNextColor() {
  var color = getRandomColor();
  animate(color);
  playSound(color);
  gameSession.eventCollection.push(color);
}

function checkEvent(id) {
	if(gameSession.eventCollection[gameSession.eventIndexSq] === id){
    gameSession.eventIndexSq++;
    if(gameSession.eventIndexSq>=gameSession.eventCollection.length) {
      gameSession.level++;
      $("#level-title").html("Level "+gameSession.level);
      gameSession = new GameSession(gameSession.eventCollection,0,gameSession.level, true);
      setTimeout(function() {addRandomNextColor();},800);
    }
  } else {
    playSound("wrong");
    if($("#highest-score").length === 0){
      sessionHighestLevel = gameSession.level;
      $("#level-title").before("<h1 id='highest-score' class='h1-title'>Highest Score: "+sessionHighestLevel+" </h1>");
    } else if(sessionHighestLevel<gameSession.level){
      sessionHighestLevel = gameSession.level;
      $("#highest-score").html("Highest Score: "+sessionHighestLevel);
    }
    $("#level-title").html("Game Over, Press Any Key To Restart!");
    gameSession.isGameOn = false;
  }
}

function playSound(id) {
  var mp3 = new Audio("sounds/"+id+".mp3");
  mp3.play();
}

function getRandomColor() {
  var num = Math.floor(Math.random()*4);
  return buttonColours[num];
}

/* GameSession Object constructor */
function GameSession(eventCollection,eventIndexSq,level, isGameOn) {
	this.eventCollection = eventCollection;
	this.eventIndexSq = eventIndexSq;
  this.level = level;
  this.isGameOn = isGameOn;
  $("#level-title").html("Level "+level);
}

function animate(color) {
  var id = "#"+color;
  $(id).addClass("pressed");
  setTimeout(function() {
    $(id).removeClass("pressed");
  },100);
}
