
var mr = 0.01;

function Vehicle(x, y, dna) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);
  this.position = createVector(x, y);
  this.r = 4;
  this.maxspeed = 4;
  this.maxforce = 0.5;
  

  // Method to update location
  this.update = function() {

    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
   
  }

  this.applyForce = function(force) {    
    this.acceleration.add(force);
  }

  this.behaviors = function() {

    //var steer = this.seek(createVector(this.position.x-1, this.position.y));
    
    //this.applyForce(steer);  

  }

  this.allign = function() {
    
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  this.seek = function(target) {

    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
    //this.applyForce(steer);
  }

  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    var angle = this.velocity.heading() + PI / 2;

    push();
    translate(this.position.x, this.position.y);
    rotate(angle);   

    var gr = color(0, 255, 0);
    var rd = color(255, 0, 0);
    var col = lerpColor(rd, gr, this.health);
    fill(col);

    stroke(col);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);

    pop();
  }


  this.boundaries = function() {
    
    if (this.position.x < 0 )
    {
      this.position.x = width;
    }
    if (this.position.x > width)
    {
      this.position.x = 0;
    }


    if (this.position.y < 0)
    {
      this.position.y = height;
    }
    if (this.position.y > height)
    {
      this.position.y = 0;
    }
    
  }
}
