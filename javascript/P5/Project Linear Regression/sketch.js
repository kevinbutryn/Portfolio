
var data_points = [];
var avg_x = 0;
var avg_y = 0;
var m = 1;
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



function linearRegression() {

  avg_x = 0;
  avg_y = 0;

  for (var i = this.data_points.length - 1; i >= 0; i--) {
    avg_x += map(this.data_points[i].x, 0, 1 ,0 , width);
    avg_y += map(this.data_points[i].y, 0, 1 ,height, 0);
 }

 avg_x = (avg_x / this.data_points.length)
 avg_y = (avg_y / this.data_points.length) 
  

 var top_m = 0;
 var bottom_m = 0;



for (var i = this.data_points.length - 1; i >= 0; i--) {
    x = map(this.data_points[i].x, 0, 1 ,0 , width)
    y = map(this.data_points[i].y, 0, 1 ,height, 0)

      console.log("x = " + x);
      console.log("y = " + y);

    top_m += (x - avg_x) * (y - avg_y)
    bottom_m += (x - avg_x) * (x - avg_x)
 }



 m = (top_m /  bottom_m) 
 b = avg_y - m * avg_x

  // console.log("m = " + m);
  // console.log("b = " + b);
}



function drawLine() {

  x1 = 0
  y1 = (m * x1 + b)
  x2 = width
  y2 = (m * x2 + b)


  // console.log("x1 = " + x1);
  // console.log("y1 = " + y1);
  // console.log("x2 = " + x2);
  // console.log("y2 = " + y2);

  stroke(255,0,100);
  line(x1,y1,x2,y2);

}


function draw() {
  background(51);


  if (this.data_points.length > 1)
  {
    linearRegression()
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
