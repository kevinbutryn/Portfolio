
var birds = [];
var bird;
var pipes = []; 
var counter = 0;
var counterP;
var pipesTotalP;
var pipes_total = 0;
var score = 0;
var reset_button;


function setup() {
  createCanvas(550,600);
  reset_game();    

  counterP = createP(); 
  pipesTotalP = createP(); 
  reset_button = createButton('RESET GAME');
  reset_button.mousePressed(reset_game);
}


function draw() {
  background(55,230,230);
  counterP.html("score: " + score);
  pipesTotalP.html("Total Pipes passed:" + pipes_total);

  //Create new pipes
  if (counter % 100 == 0)
  {
    pipes.push(new pipe());
  }

  ////////////////////////////////////////////////////
  //loop through birds
  // for(var i = birds.length-1; i >= 0; i--)
  // {
  //   birds[i].update(); 
  //   birds[i].hitPipe(pipes); 
  // }

  //loop through single bird
  if(!bird.isDead){
    bird.update();    
    bird.hitPipe(pipes); 
  }
  ////////////////////////////////////////////////////

  //loop through pipes
  for(var i = pipes.length-1; i >= 0 ; i--){

    pipes[i].update();

    if ((pipes[i].x == 40) && (!bird.isDead)){
      pipes_total++;
    }
    if (pipes[i].offscreen())
    {
      pipes.splice(i,1);      
    }
  }  

    display_game();

    if (!bird.isDead){
      counter++;
      score = counter;
    }
    else
    {
      counter++;
      noStroke();      
      textSize(80);
      fill(240,25,10); 

      textAlign(CENTER,CENTER);
      text('THE END',0,height*.4,width);
      text('SCORE: ' + score,0,height*.60,width);
      text('PIPES: ' + pipes_total,0,height*.8,width);
    }    
}

function display_game(){
  
  for(var i = pipes.length-1; i >= 0 ; i--){
    pipes[i].show();
  }

  //loop through birds
  // for(var i = birds.length-1; i >= 0; i--)
  // {
  //   birds[i].show();  //   
  // }

  //loop through single bird
  if(!bird.isDead){   
    bird.show();    
  }

}

function keyPressed() {
  if (key === ' '){
    bird.fly();
  }
} 

function reset_game(){
  for(var i = 0; i > 500; i++)
  {
    // birds.push( new Bird());
  }      
    bird = new Bird();

    score = 0;
    counter = 0;
    pipes_total=0;
    pipes = [];
    birds = [];
}