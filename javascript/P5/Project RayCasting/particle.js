const start_posx = 300;
const start_posy = 300;
const incr = 1;

class Particle{

  constructor() {
    this.pos = createVector(start_posx,start_posy);
    this.w = 4;
    this.rays = [];
    this.createRays();
  }

  createRays(){
    this.rays = [];
    for (let a = 0; a < 360; a += incr){
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  showRays(){
    for(let ray of this.rays){
      ray.show();
    }
  }

  show(){
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.w, this.w)
  }

  update(walls){
    //move
    this.pos.x = mouseX;
    this.pos.y = mouseY;

    //create new rays at location
    this.createRays();
    
    //update rays logic
    for (let ray of this.rays){
      ray.update(walls);
    }
  }
}

