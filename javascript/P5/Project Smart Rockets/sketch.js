var population;
var target;
var count = 0;
var lifeSpan = 400;
var lifeP;
var genP;
var genCompletedP;
var forceMulti = .2;
var generationCount = 0;
var generationCompleted = 0;
var mutationRate = .01;
var foundPath = false;
var obstacles;
var numObstales = 10;

var rx = 150;
var ry = 250;
var rw = 300;
var rh = 10;


function setup() {
  createCanvas(600,600); 
  population = new Population();
  obstacles = new Obstacles(numObstales);
  target = createVector(width/2,50);
  lifeP = createP();
  genP = createP();
  genCompletedP = createP();

}

function draw() {  
  background (51);    
  ellipse(target.x,target.y,16,16)
  obstacles.display();

  lifeP.html(count);


  fill(255);
  

  //rect(rx,ry,rw,rh);
  
  population.spawn();
 
  count++;
  if (count == lifeSpan)
  {  	
  		if(foundPath){
  			genCompletedP.html("generationCompleted : " + generationCount + " at " + lifeSpan)
  			foundPath = false;
 		 	lifeSpan = lifeSpan - 10;
 		 }


  		population.evaluate();
  		population.selection();

  		generationCount++
  		genP.html("generationCount : " + generationCount)
  	  	
  	  	count = 0;
  }  


}








//GARBAGE

  //sliderAngle = createSlider(0, TWO_PI, PI / 4,.01)
  //angle = sliderAngle.value();

  //console.log("draw fucntion!")
  //console.log(frameCount)
  //print("setup function!");

  //rect(50,100,20,10);
