const start_posx = 300;
const start_posy = 300;
const incr = 45;

class Particle{

  constructor() {
    this.pos = createVector(start_posx,start_posy);
    this.w = 20;
    this.rays = [];
    this.alive = true;
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
    if (this.alive){
      stroke(255);
    } else{
      //console.log ("im dead");
      fill(255,0,0);
    }
    ellipse()
    ellipse(this.pos.x, this.pos.y, this.w, this.w)
  }

  move(newX,newY){
    //move
    //this.pos.x = mouseX;
    //this.pos.y = mouseY;
    this.pos.x = newX;
    this.pos.y = newY;
  }

  update(walls){
    //create new rays at location
    this.createRays();
    
    //update rays logic
    for (let ray of this.rays){
      ray.update(walls);
      
      if (ray.pt){
        if (ray.pt.d < this.w / 2){
          this.alive = false;
        }
      } 
    }
  }
}

