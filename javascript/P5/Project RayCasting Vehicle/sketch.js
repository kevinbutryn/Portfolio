let walls = [];
let vehicle = [];
let dir = '';
let start,end;
let brain;
let SIGHT = 300;
let POPSIZE = 100;
let time = 0;
let LIFELIMIT = 300;
let mr = .1


function setup() {


  tf.setBackend('cpu');
  createCanvas(600,600);
  createBoundaries();

  for(let j = 0; j < POPSIZE; j++){
    vehicle.push(new Vehicle())
  }
}


function draw() {
    background(0);
    let alive = false;
    time+=1;
    for(let j = 0; j < POPSIZE; j++){
      if(vehicle[j].alive){
        alive = true;
        // update particle and rays
        vehicle[j].update(walls);

        //show particle rays and DEBUG
        //vehicle[j].showRays();
      }
    }

    if (!alive || (time == LIFELIMIT))
    {
      time = 0;
      nextGeneration();
    }

    //draw the world, boundaries, vehicles
    drawWorld();
    
  }

  function checkInput(input) {
  
    if (input === 0){
      dir = 'LEFT'
    }
    if (input === 1){
      dir = 'RIGHT'
    }
    if (input === 2){
      dir = 'FORWARD'
    }
    if (input === 3){
      dir = 'BACKWARD'
    }
    // if (keyIsDown(LEFT_ARROW)) {
    //   dir = 'LEFT'
    // }
  
    // if (keyIsDown(RIGHT_ARROW)) {
    //   dir = 'RIGHT'
    // }
  
    // if (keyIsDown(UP_ARROW)) {
    //   dir = 'FORWARD'	
    // }
  
    // if (keyIsDown(DOWN_ARROW)) {
    //   dir = 'BACKWARD'	
    // }
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
    for(let j = 0; j < POPSIZE; j++){
      vehicle[j].show();
    }
  }

  function createBoundaries(){
    
    
    
    //Random boundaries
    // for (let i = 0; i < 2; i++){
      // // random points
      // let x1 = random(0, width); 
      // let x2 = random(0, width);
      // let y1 = random(0, height);
      // let y2 = random(0, height);
  
      // // add random wall
      // walls.push (new Boundary(x1,y1,x2,y2));
    // }
  
    //racetrack
    // walls.push(new Boundary(100, height, 100, 250));
    // walls.push(new Boundary(200, height, 200, 300));
  
    // walls.push(new Boundary(100, 250, 250, 100));
    // walls.push(new Boundary(200, 300, 300, 200));
  
    // walls.push(new Boundary(250, 100, width, 100));
    // walls.push(new Boundary(300, 200, width, 200));
    
    // end and start
    start = createVector(150,550);
    end = createVector(550,150);
    
    //add edges
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(0, height, 0, 0));
  }

