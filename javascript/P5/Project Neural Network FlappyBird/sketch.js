
var bird;
var pipe;


function setup() {
  createCanvas(550,600);

  bird = new Bird();
  pipe = new pipe();
    
}


function draw() {
  background(55,230,230);

  bird.show();
  bird.update();
  

  pipe.show();
  pipe.update();
    
}

function keyPressed() {

  if (key === ' '){
    bird.fly();
  }

} 
