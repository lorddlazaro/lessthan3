
<script>
//Initialization***************************************************************************************************************
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 480;

var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');

var backgrounds = {
  mainMenu : Sprite("mainMenu"),
  level1bg : Sprite("level1bg"),
  level2bg : Sprite("level2bg")
};

var FPS = 30;
var moveRate = 5;

var NUM_ACC = 3;
var NUM_HAIR = 5;
var NUM_SKIN = 5;
var NUM_EYES = 16;
var NUM_UPPER = 5;
var NUM_LOWER = 5;
var NUM_PEOPLE = 10;
var people = generatePeople(NUM_PEOPLE, CANVAS_WIDTH, CANVAS_HEIGHT, NUM_ACC, NUM_HAIR, NUM_SKIN, NUM_EYES, NUM_UPPER, NUM_LOWER);

var NUM_QUESTIONS;

var level = 1;
var lives = 10;
var levelComplete = false;

//For Mouse clicks**************************************************************************************************************
function getMousePos(canvas, evt) {
        var rect = canvasElement.get(0).getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

canvasElement.get(0).addEventListener('click', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  if(level==1 ){
    if(levelComplete){
      level++;
      levelComplete = false;
    }
    else if(lives <= 0){


    }
    else{
      var indicesToRemove = [];
        for(var i=0;i<NUM_PEOPLE;i++){
          if(people[i].isClicked(mousePos.x, mousePos.y)){
            if(people[i].isTheOne)
            levelComplete = true;
          else{
            lives--;
            indicesToRemove.push(i);
          }
          break;
        }
        }
        var length = indicesToRemove.length;
        for(var i=0;i<length; i++){
          people.splice(indicesToRemove[i],1);
    }
    }
    NUM_PEOPLE -= length;
  }
    }, false);


//Game Proper*******************************************************************************************************************
setInterval(function() {
  update();
  draw();
}, 1000/FPS);


function update() {
  if(level == 1){
    if(!levelComplete && lives > 0){
      for(var i=0;i<NUM_PEOPLE;i++){
        //make the crowd move randomly
        people[i].move();
        clamp(people[i], CANVAS_WIDTH, CANVAS_HEIGHT);
      }
    }
    else if(lives <= 0){
      
    }
    
  }
  else if(level == 2){
    if(!levelComplete){
      
    }
  } 

}

function draw() {
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if(level == 1){
    //draw background
    backgrounds.level1bg.draw(canvas, 0, 0);
    //draw all people
  var length = people.length;
  for(var i=0;i<length;i++){
    people[i].draw();
  }
  drawCanvasText(canvas, CANVAS_WIDTH, CANVAS_HEIGHT, lives, level, levelComplete);
  }
  else if(level == 2){
    backgrounds.level2bg.draw(canvas, 0, 0);
    //drawbackground
    people[0].drawScaledAtXY(10,30,2);
    drawCanvasText(canvas, CANVAS_WIDTH, CANVAS_HEIGHT, lives, level, levelComplete);
  }
    

}

</script>