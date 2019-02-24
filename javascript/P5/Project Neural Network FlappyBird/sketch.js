
var birds = [];
var bird;
var pipes = []; 
var counter = 0;
var counterP;
var generationsP;
var pipesTotalP;
var pipes_total = 0;
var score = 0;
var reset_button;
var birdsDead = true
var generations = 0;
var Top_score = 0;
var Top_pipes_total = 0;
var speed_slider; 
var speed;


function setup() {
  createCanvas(550,600);
  reset_game();    

  
  counterP = createP(); 
  pipesTotalP = createP(); 
  generationsP = createP();
  speed_slider = createSlider(1,100,1,1);
  TopcounterP = createP(); 
  ToppipesTotalP = createP(); 
  reset_button = createButton('RESET GAME');
  reset_button.mousePressed(reset_game);
}


function draw() {
  background(55,230,230);
  counterP.html("Current score: " + score);
  pipesTotalP.html("Current Pipes passed:" + pipes_total);
  generationsP.html("Generations: " + generations);
  TopcounterP.html("Top score: " + Top_score);
  ToppipesTotalP.html("Top Pipes passed:" + Top_pipes_total);

  speed = speed_slider.value();


  for (var j = 0; j < speed; j++)
  {
    
  
    //Create new pipes
    if (counter % 100 == 0)
    {
      pipes.push(new pipe());
    }

    
    //loop through birds
    birdsDead = true;
    for(var i = birds.length-1; i >= 0; i--)
    {
         if(!birds[i].isDead){
          birds[i].guess(pipes);
          birds[i].update(); 
          birds[i].hitPipe(pipes);
          birds[i].fitness();
          birdsDead = false;           
         }
    }

    //loop through pipes
    for(var i = pipes.length-1; i >= 0 ; i--){

      pipes[i].update();

      if ((pipes[i].x == 40) && (!birdsDead)){
        pipes_total++;
      }
      if (pipes[i].offscreen())
      {
        pipes.splice(i,1);      
      }
    }  

    //check if game over
    if (!birdsDead){
        counter++;
        score = counter;
      }
      else
      {      
        generations++;
        if (Top_pipes_total < pipes_total){
          Top_pipes_total = pipes_total;
        }
        if (Top_score < score){
          Top_score = score;
        }
        reset_game();
      }    
  } 
  
  display_game();

    
}

function display_game(){

  for(var i = pipes.length-1; i >= 0 ; i--){
    pipes[i].show();
  }

  //loop through birds
  for(var i = birds.length-1; i >= 0; i--)
  {
    if(!birds[i].isDead){
    birds[i].show();   
    }  
  }

  //loop through single bird
  // if(!bird.isDead){   
  //   bird.show();    
  // }

}

// function keyPressed() {
//   if (key === ' '){
//     bird.fly();
//   }
// } 

function reset_game(){

    birds = [];
  for(var i = 0; i < 100; i++)
  {    
     birds.push( new Bird());     
  }      
    // bird = new Bird();

    score = 0;
    counter = 0;
    pipes_total=0;
    pipes = [];
}