const start_posx = 300;
const start_posy = 300;
const incr = 45;

class Vehicle{

  constructor() {
    this.pos = createVector(start_posx,start_posy);
    this.vel = createVector(0,.5);	
    this.acc = createVector(0,0);
    this.w = 20;
    this.maxSpeed = 3;
    this.rays = [];
    this.alive = true;
    this.maxspeed = 2;
    this.maxforce = .5; 
    this.createRays();
  }

  applyForce(force){

    if(force.equals(createVector(0,0)))
    {
      if (!this.vel.equals(createVector(0,0))){
        if(this.vel.mag() < .1)
        {
          this.vel.mult(0);
          return
        }
        this.vel = this.vel.mult(.95);      
      }
    }
    
    // add force
    this.acc.add(force);
    
    //Add to velocity, and limit
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    
    //move and make Acc 0
    this.pos.add(this.vel);
    this.acc.mult(0);
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
    // change color if dead
    if (this.alive){
      fill(255);
    } else{
      fill(255,0,0);
    }

    //draw vehicle
    push();
      translate (this.pos.x, this.pos.y)
      rotate(this.vel.heading());
      rectMode(CENTER);
      rect(0, 0, 20,4);
    pop();
  }

  move(){    
    //set default drag
    let force = createVector(0,0);

    let tempv = this.vel.copy();
    let heading = tempv.heading();
    let temp = p5.Vector.fromAngle(heading);
    console.log(temp)
    
    //set force based on DIR set
    if (dir === 'FORWARD'){
      //force.add( createVector(0,-1));
      force.add(temp);
    }
    if (dir === 'BACKWARD'){
      // force.add(createVector(0,1));
      force.add(temp.mult(-1));
    }
    if (dir === 'RIGHT'){
      force.add( createVector(.1,0));
    }
     if (dir === 'LEFT'){
      force.add( createVector(-.1,0));	
    }

 

    //Apply the force in the direction
    this.applyForce(force);

    //Set default to forward
    dir = ''	
  }

  seek(target) {

    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
    //this.applyForce(steer);
  }

  update(walls){

    //move vehicle
    this.move();

    //update rays of particle 
    this.updateRays(walls);
  }
  
  updateRays(walls){
    //create new rays at location
    this.createRays();
    
    //update rays logic
    for (let ray of this.rays){
      ray.update(walls);
      

      //check if crashed
      if (ray.pt){
        if (ray.d < this.w / 2){
          this.alive = false;
        }
      } 
    }
  }
}






    // OTHER MOVE METHODS

    //random forward backward
    // let force = createVector(0,0);
    // let num = random(0,3)

    // if (num > 2){
    //   force = this.seek(createVector(0,-1));
    // }else if (num < 1){
    //   force = this.seek(createVector(1,0));
    // } else {
    //   force = this.seek(createVector(-1,0));
    // }

    //Random Direction
    //force = createVector(random(-.1,.1),random(-.1,.1))
    
    //manual move
    //this.pos.x = mouseX;
    //this.pos.y = mouseY;
