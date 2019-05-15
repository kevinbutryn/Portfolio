let walls = [];
let ray;
let p;
let xoff = 0;
let yoff = 10000;

let start,end;
function setup() {
  createCanvas(600,600);
  walls = [];
  p = new Particle();

  for (let i = 0; i < 2; i++){
    
    // // random points
    // let x1 = random(0, width); 
    // let x2 = random(0, width);
    // let y1 = random(0, height);
    // let y2 = random(0, height);

    // // add wall
    // walls.push (new Boundary(x1,y1,x2,y2));


    walls.push(new Boundary(100, 500, 100, 250));
    walls.push(new Boundary(200, 500, 200, 250));

    walls.push(new Boundary(100, 250, 250, 100));
    walls.push(new Boundary(200, 250, 250, 200));

    walls.push(new Boundary(250, 100, 450, 100));
    walls.push(new Boundary(250, 200, 450, 200));

    start = createVector(150,500);
    end = createVector(450,150);
  }

  //add edges
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));

}


function draw() {
    background(0);
    
    // show obstacles
    for (let wall of walls){
      wall.show();
    }

    // move
    p.move(noise(xoff) * width, noise(yoff) * height);

    // update particle and rays
    p.update(walls);

    //show particle
    p.show();

    //show particle rays
    p.showRays();


    ellipse(start.x,start.y,10)
    ellipse(end.x,end.y,10)
    xoff += 0.01;
    yoff += 0.01;
  }


