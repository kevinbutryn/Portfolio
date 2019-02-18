var r,g,b;
let brain;

var bestColor = "black";
var realBestColor = "black"


function setup() {
  createCanvas(1000,500);

  brain = new NeuralNetwork(3,3,2); // (inputs, hidden, outputs)


  for (let i = 0; i< 10000; i++){
    let r = random(255);
    let g = random(255);
    let b = random(255);

    trainColor(r,g,b);

  }

  randomColor();
    
}


function draw() {
  background(r,g,b);
  var total = round(r + g + b);

  stroke(3);
  strokeWeight(3);
  line( width/2 , 0 , width/2 , height );


  noStroke();
  textAlign(CENTER);
  textSize(64);

  fill(0);  
  text('BLACK', width * .25, height/2);

  fill(255);
  text('WHITE', width * .75, height/2);


  textSize(32);
  fill(255);  
  textAlign(LEFT);
  text('Prediction:', width * .01, height * .25);  
  text('Answer:', width * .01, height * .75);
  text('RGB:' + total , width * .01, height * .50);

  
  if (bestColor == "black") // on top
  {
    fill(0);
    ellipse( width * .25, height *.25, 80)
  } else {
    fill(255);
    ellipse( width * .75, height *.25, 80)
  }

  if (realBestColor == "black") // on bottom
  {
    fill(0);
    ellipse( width * .25, height *.75, 80)
  } else {
    fill(255);
    ellipse( width * .75, height *.75, 80)
  }
    
}

function mouseClicked(){   
   randomColor(); 
 }

function randomColor(){

  r = random(255);
  b = random(255);
  g = random(255); 

  predictColor(r,g,b);

}

function predictColor(r, g, b){

  let inputs = [ r/255 , g/255 , b/255 ];
  let outputs = brain.predict(inputs);
  //console.log(outputs);


  if (outputs[0] > outputs[1]) // on top
  {
    bestColor =  "black";
  } else {
    bestColor =  "white"
  }


  if (r + g + b > (255*3)/2) // on bottom
  {
    realBestColor = "black";    
  } else {
    realBestColor = "white"
  }

}

function trainColor(r,g,b){
  let inputs = [ r/255 , g/255 , b/255 ];

   let targets;
   if (r + g + b > (255*3)/2)
   {
    targets = [1,0];
   } else {
    targets = [0,1];
   }   

  brain.train(inputs,targets)
}