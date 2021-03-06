
var vehicles = [];
var food = [];
var poison = [];
var boundary = 25;

var debug;

function setup() {
  createCanvas(800,800);
  for (var i = 0; i < 30; i++) {
    var x = random(width);
    var y = random(height);
    vehicles[i] = new Vehicle(x, y);
  }
  // initial food
  for (var i = 0; i < 100; i++) {
    var x = random(boundary, width - boundary);
    var y = random(boundary, height - boundary);
    food.push(createVector(x, y));
  }

  //initial posion
  for (var i = 0; i < 100; i++) {
    var x = random(boundary, width - boundary);
    var y = random(boundary, height - boundary);
    poison.push(createVector(x, y));
  }

  debug = createCheckbox();
  debug.checked(true);
}


function draw() {
  background(51);

  //create random food
  if (random(1) < 0.1) {
    var x = random(boundary, width - boundary);
    var y = random(boundary, height - boundary);
    food.push(createVector(x, y));
  }
  // create random poison
  if (random(1) < 0.01) {
    var x = random(boundary, width - boundary);
    var y = random(boundary, height - boundary);
    poison.push(createVector(x, y));
  }

  //display food
  for (var i = 0; i < food.length; i++) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 4, 4);
  }

  //display poison
  for (var i = 0; i < poison.length; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4, 4);
  }

  //iterate through vehicles
  for (var i = vehicles.length - 1; i >= 0; i--) {
    //vehicles[i].boundaries();

    //find direction to move
    vehicles[i].behaviors(food, poison);
    //move direction
    vehicles[i].update();
    vehicles[i].display();

    var newVehicle = vehicles[i].clone();
    if (newVehicle != null) {
      vehicles.push(newVehicle);
    }

    if (vehicles[i].dead()) {
      var x = vehicles[i].position.x;
      var y = vehicles[i].position.y;
      //food.push(createVector(x, y));
      vehicles.splice(i, 1);
    }
    if (vehicles.length == 0)
    {
      setup();
    }

  }
}


///IDEAS

// current, vehicles evolve to find food and not eat poison by evolution and random chance



//TODO
//add predators to eat vehicles. 
//  predator hunts and eats vehicles. goes for healthy vehicles? 

// mating? only when vehicles are in vicinity (distence)

//obstacles? 

  // distance between another object around obstacles 
