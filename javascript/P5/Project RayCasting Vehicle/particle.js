const start_posx = 300;
const start_posy = 300;
const incr = 45;

class Particle{

  constructor() {
    this.pos = createVector(start_posx,start_posy);
    this.vel = createVector();	
    this.acc = createVector();
    this.w = 20;
    this.maxSpeed = 3;
    this.rays = [];
    this.alive = true;
    this.createRays();
  }
  applyForce(force){
    this.acc.add(force);
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
    push();
      translate (this.pos.x, this.pos.y)
      rotate(this.vel.heading());
      rectMode(CENTER);
      rect(0, 0, 20,4);
      //ellipse(this.pos.x, this.pos.y, this.w, this.w)
    pop();
  }

  move(newX,newY){
    //move
    //this.pos.x = mouseX;
    //this.pos.y = mouseY;
    
    //this.pos.x = newX;
    //this.pos.y = newY;
    let force = createVector(0,0);
    let num = random(0,3)
    if (num > 2){
      force = createVector(0,-1);
    }else if (num < 1){
      force = createVector(1,0);
    } else {
      force = createVector(-1,0);
    }
    //force = createVector(random(-.1,.1),random(-.1,.1))
    

    this.applyForce(force );

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.limit(this.maxSpeed);
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

