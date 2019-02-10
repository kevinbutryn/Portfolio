
var data_points = [];
var m = 0;
var b = 0;

//m = (sum of (x - avg x )(y - avg y) )/ (sum of x - avg x)^2
//b = avg y - m(avg x)

function setup() {
  createCanvas(500,500);  
  
    
}

function mousePressed() {
  var x_point = map (mouseX,0,width,0,1);
  var y_point = map (mouseY,0,height,1,0);


  var data_point = createVector( x_point, y_point );
  this.data_points.push(data_point)  
}



function gradientRegression() {
  learnRate = 0.05; 


for (var i = this.data_points.length - 1; i >= 0; i--) {

    x = this.data_points[i].x
    y = this.data_points[i].y

    var guess = m * x + b;
    var error = y - guess;

   m = m + (error * x) * learnRate
   b = b + (error) * learnRate
 }

 
  // console.log("m = " + m);
  // console.log("b = " + b);
}



function drawLine() {

  x1 = 0
  y1 = (m * x1 + b)
  x2 = 1
  y2 = (m * x2 + b)

  x1 = map(x1, 0, 1 ,0 , width)
  y1 = map(y1, 0, 1 ,height , 0)
  x2 = map(x2, 0, 1 ,0 , width)
  y2 = map(y2, 0, 1 ,height , 0)


  stroke(255,0,100);
  line(x1,y1,x2,y2);

}


function draw() {
  background(51);


  if (this.data_points.length > 1)
  {
    gradientRegression()
    drawLine()
  }

  // draw points
  stroke(255,0,0);
  fill(255,0,0);



  for (var i = this.data_points.length - 1; i >= 0; i--) {

    var x_point = map(this.data_points[i].x, 0, 1 ,0 , width);
    var y_point = map(this.data_points[i].y, 0, 1 ,height, 0);
    
    ellipse ( x_point, y_point, 8, 8)

  }

}
