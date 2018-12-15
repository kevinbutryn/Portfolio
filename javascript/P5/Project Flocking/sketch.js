
var vehicles = [];
var vehicleCount = 1;


function setup() {
  createCanvas(800,800);
  for (var i = 0; i < vehicleCount; i++) {
    //var x = random(width);
    //var y = random(height);
    var x = width/2;
    var y = height/2;

    vehicles[i] = new Vehicle(x, y);
    vehicles[i].velocity = createVector(random(-1,1), random(-1,1));
    console.log(vehicles[i].velocity.heading() + (PI / 2)); 
  }
    
}


function draw() {
  background(51);

  
  //iterate through vehicles
  for (var i = vehicles.length - 1; i >= 0; i--) {
    //vehicles[i].boundaries();

    //find direction to move
    vehicles[i].behaviors();

    //move direction
    vehicles[i].update();
    vehicles[i].display(); 
    vehicles[i].boundaries();
  }
}
