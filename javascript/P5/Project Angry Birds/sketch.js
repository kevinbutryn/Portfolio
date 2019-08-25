let bird;
let box;
let ground;

function setup() {
  createCanvas(600,400);
  
  console.log(Matter);

  ground = new Box(0, height-20, width, 20);
  box = new Box (450, 300, 50, 75);
  bird = new Box (50, 300, 25);
}


function draw() {
  background(0);
  ground.show();
  box.show();
  bird.show();
}


