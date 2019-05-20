let walls = [];
let vehicle;
let xoff = 0;
let yoff = 10000;
let dir = '';
let start,end;


function setup() {

  createCanvas(600,600);
  createBoundaries();

  vehicle = new Vehicle();
 
}


function draw() {
    background(0);
    
    //Check Input
    checkInput()

    // if(vehicle.alive){
      // update particle and rays
      vehicle.update(walls);
    // }

    //draw the world, boundaries, vehicles
    drawWorld()
    
    //show particle rays and DEBUG
    vehicle.showRays();


  }






  function createBoundaries(){
    for (let i = 0; i < 2; i++){
      // // random points
      // let x1 = random(0, width); 
      // let x2 = random(0, width);
      // let y1 = random(0, height);
      // let y2 = random(0, height);
  
      // // add random wall
      // walls.push (new Boundary(x1,y1,x2,y2));
    }
  
    //racetrack
    walls.push(new Boundary(100, 500, 100, 250));
    walls.push(new Boundary(200, 500, 200, 250));
  
    walls.push(new Boundary(100, 250, 250, 100));
    walls.push(new Boundary(200, 250, 250, 200));
  
    walls.push(new Boundary(250, 100, 450, 100));
    walls.push(new Boundary(250, 200, 450, 200));
  
    // end and start
    start = createVector(150,500);
    end = createVector(450,150);
    
    //add edges
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(0, height, 0, 0));
  }

  function checkInput() {
  
    if (keyIsDown(LEFT_ARROW)) {
      dir = 'LEFT'
    }
  
    if (keyIsDown(RIGHT_ARROW)) {
      dir = 'RIGHT'
    }
  
    if (keyIsDown(UP_ARROW)) {
      dir = 'FORWARD'	
    }
  
    if (keyIsDown(DOWN_ARROW)) {
      dir = 'BACKWARD'	
    }
  }
  function keyReleased(){
    dir = 'DRAG'
  }

  function drawWorld(){
      // draw boundaries
      for (let wall of walls){
        wall.show();
      }
  
      // draw start and end
      ellipse(start.x,start.y,10)
      ellipse(end.x,end.y,10)

    //show particle
    vehicle.show();
  }
