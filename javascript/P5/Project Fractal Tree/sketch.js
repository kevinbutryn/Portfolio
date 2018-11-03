var angle;
var initLength;
var colorCount;


function setup() {

  createCanvas(800,800);  
  sliderAngle = createSlider(0, TWO_PI, PI / 4,.01)
  sliderLength = createSlider(0, 600, 100, 10)

 
}

function draw() {  

  background (51); 
  colorCount = 255;
    
  angle = sliderAngle.value();
  initLength = sliderLength.value();
  

  translate(width / 2 ,height);

  branch(initLength);

}

function branch(len) {

  

  line (0, 0, 0, -len);
  translate(0, -len);

  
    
  if (len > 4){

    colorCount += -.1;
    stroke(colorCount);

    push();
    rotate(angle);
    branch(len * 0.67);
    pop();

    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();

  }
}















//GARBAGE

  //console.log("draw fucntion!")
  //console.log(frameCount)
  //print("setup function!");

  //rect(50,100,20,10);
