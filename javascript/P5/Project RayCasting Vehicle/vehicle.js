class Vehicle{

  constructor() {
    this.pos = createVector(start.x,start.y);
    this.vel = createVector(0,-.5);	
    this.acc = createVector(0,0);
    this.w = 20;
    this.maxSpeed = 3;
    this.rays = [];
    this.alive = true;
    this.maxspeed = 3;
    this.maxforce = .5; 
    this.STEERINGFORCE = .1;
    this.BREAKFORCE = .9
    this.createRays();
    this.updateRays(walls);
  }

  applyForce(force){

    if(force.equals(createVector(0,0)))
    {
        this.vel = this.vel.mult(.97);      
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
    let head = this.vel.heading()
    for (let a = PI/2; a >= -PI/2; a -= PI/4){
      let ray = new Ray(this.pos, a + head)
      
      this.rays.push(ray);
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
      rect(0, 0, 15,4);
    pop();
  }

  move(){    
    //set default drag
    let force = createVector(0,0);

    let heading = this.vel.heading();
    let temp = p5.Vector.fromAngle(heading);
    let steer = map(this.vel.mag(), 0, this.maxspeed, 0 , this.STEERINGFORCE )

    
    //set force based on DIR set
    if (dir === 'FORWARD'){
      force= ( createVector(temp.x,temp.y))
    }
    if (dir === 'BACKWARD'){
      this.vel.mult(this.BREAKFORCE)
    }
    if (dir === 'RIGHT'){
      temp.mult(steer)
      temp.rotate(PI/2)
      force = ( createVector(temp.x,temp.y));
    }
     if (dir === 'LEFT'){
      temp.mult(steer)
      temp.rotate(-PI/2)
      force = ( createVector(temp.x,temp.y));
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
