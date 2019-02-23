
var bird;
var pipes = []; 
var counter = 59;


function setup() {
  createCanvas(550,600);


  bird = new Bird();
  //pipe = new pipe();
    
}


function draw() {
  background(55,230,230);

  if (counter % 60 == 0)
  {
    pipes.push(new pipe());
  }


  
  bird.show();
  bird.update();  

  for(var i = pipes.length-1; i >= 0 ; i--){

    pipes[i].show();
    pipes[i].update();

    if (pipes[i].offscreen())
    {
      pipes.splice(i,1);
    }
  }
  
  
    counter++;
}

function keyPressed() {

  if (key === ' '){
    bird.fly();
  }

} 
