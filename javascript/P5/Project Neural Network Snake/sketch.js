var rows, cols;
let scale = 20;
var snake;
var direction;
var score = 1;
var reset_button;
var brain;
var takeOver = false;

function setup() {
  createCanvas(400,400);
  
  reset_button = createButton('RESET GAME');
  reset_button.mousePressed(resetGame);
  rows = width / scale;
  cols = height / scale;

  snake = new snake();
  direction = createVector(0,1);

  // brain = new NeuralNetwork(24,16,4);
  brain = new NeuralNetwork(12,9,4);
}


function draw() {
  frameRate(5);
  background(150);
  strokeWeight(1);
  noFill();
  stroke(8);
  
  for (var y = 0; y <= rows; y++){

    beginShape(QUAD_STRIP);

    for (var x = 0; x <= cols; x++){
      x1 = x * scale;
      x2 = x * scale;
      y1 = y * scale;
      y2 = (y+1) * scale;
  
      vertex(x1, y1);
      vertex(x2, y2);
    }

    endShape();
  }
  

  inputs = snake.getInputs();
  // console.log(inputs);

  outputs = brain.predict(inputs);
  console.log(outputs);

  index = -1;
  maxVal = -1;

  for(var x = 0; x < outputs.length; x++){
    if (maxVal < outputs[x])
    {
      maxVal = outputs[x];
      index = x;
    }
  }

  if (takeOver){
    if (index == 0){
      dir = "up";
      direction = createVector(0,-1);
    }else if (index == 1){
      dir = "down";
      direction = createVector(0,1);
    }else if (index == 2){
      dir = "left";
      direction = createVector(-1,0);
    }else if (index ==3){
      dir = "right";
      direction = createVector(1,0);
    }

    snake.setDirection(direction);
  }
  else {
    trainBrain(inputs);
  }

  snake.update();
  snake.show();
}

function keyPressed() {

	if (keyCode === RIGHT_ARROW){
		direction = createVector(1,0);
	}else if (keyCode === LEFT_ARROW){
		direction = createVector(-1,0);
	}else if (keyCode === UP_ARROW){
		direction = createVector(0,-1);
	}else if (keyCode === DOWN_ARROW){
    direction = createVector(0,1);
  }else if (key == ' '){
    takeOver = true;
    console.log("AI TAKING OVER");
  }
  
  snake.setDirection(direction);
}

function gameOver() {
  // noStroke();      
  textSize(80);
  fill(240,25,10); 

  textAlign(CENTER,CENTER);
  text('THE END',0,height*.4,width);
  text('SCORE: ' + score,0,height*.6,width);
  noLoop();
}

function resetGame(){
  snake.reset();
  takeOver = false;
  loop();
}

function trainBrain(input){
  
  if (direction.y == -1){ //top
    targets = [1,0,0,0];
  }else if (direction.y == 1){ //down
    targets = [0,1,0,0];
  }else if (direction.x == -1){ //left
    targets = [0,0,1,0];
  }else if (direction.x == 1){ //right
    targets = [0,0,0,1];
  }

  brain.train(input,targets);
}