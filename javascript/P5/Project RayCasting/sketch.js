let walls = [];
let ray;
let p;

function setup() {
  createCanvas(600,600);
  walls = [];
  p = new Particle();

  for (let i = 0; i < 6; i++){
    
    let x1 = random(0, width); 
    let x2 = random(0, width);
    let y1 = random(0, height);
    let y2 = random(0, height);

    walls.push (new Boundary(x1,y1,x2,y2));
  }

}


function draw() {
    background(0);
    
    // show obstacles
    for (let wall of walls){
      wall.show();
    }

    // update particle 
    p.update(walls);

    //show particle
    p.show();

    //show particle rays
    p.showRays();


    //ray.lookAt(mouseX, mouseY);
    
    //let pt = ray.cast(wall);
    
    // console.log(pt)
    // if (pt){
    //   fill(255);
    //   ellipse(pt.x, pt.y, 10, 10);
    // }
  }


