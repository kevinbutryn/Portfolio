
var birds = [];
var bird;
var pipes = []; 
var counter = 0;


function setup() {
  createCanvas(550,600);

  for(var i = 0; i > 500; i++)
  {
    // birds.push( new Bird());
  }      
    bird = new Bird();     
}

function draw() {
  background(55,230,230);

  //Create new pipes
  if (counter % 100 == 0)
  {
    pipes.push(new pipe());
  }


  //loop through birds
  // for(var i = birds.length-1; i >= 0; i--)
  // {
  //   birds[i].show();
  //   birds[i].update(); 
  //   birds[i].hitPipe(pipes); 
  // }

  //loop through single bird
  if(!bird.isDead){
    bird.update();
    bird.show();
    bird.hitPipe(pipes); 
  }


  //loop through pipes
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
