
var mr = 0.01;

function Vehicle(x, y, dna) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, -2);
  this.position = createVector(x, y);
  this.r = 4;
  this.maxspeed = 4;
  this.maxforce = 0.5;
  this.timeAlive = 0;

  this.health = 1;

  this.dna = [];
  if (dna === undefined) {
    // Food weight
    this.dna[0] = random(-2, 2);
    // Poison weight
    this.dna[1] = random(-2, 2);
    // Food perception
    this.dna[2] = random(0, 100);
    // Poision Percepton
    this.dna[3] = random(0, 100);
  } else {
    // Mutation
    this.dna[0] = dna[0];
    if (random(1) < mr) {
      this.dna[0] += random(-0.1, 0.1);
    }
    this.dna[1] = dna[1];
    if (random(1) < mr) {
      this.dna[1] += random(-0.1, 0.1);
    }
    this.dna[2] = dna[2];
    if (random(1) < mr) {
      this.dna[2] += random(-10, 10);
    }
    this.dna[3] = dna[3];
    if (random(1) < mr) {
      this.dna[3] += random(-10, 10);
    }
  }

  // Method to update location
  this.update = function() {

    this.health -= 0.005;
    this.timeAlive++;

    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);

    //eat poison/food/prey if in certain range
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  this.behaviors = function(good, bad) {
    var steerG = this.eat(good, 0.2, this.dna[2]);
    steerG.mult(this.dna[0]);

    var steerB = this.eat(bad, -1, this.dna[3]);
    steerB.mult(this.dna[1]);

    var steerBoundary = this.boundaries();
    
    
    

    this.applyForce(steerG);
    this.applyForce(steerB);
    

    if (steerBoundary !== null)
    {
      this.applyForce(steerBoundary);
      //Action = "boundary";
    }



    // order of operations

    // explore: default
    
    // if see food go toward food and if see poison, go away from poison


    // switch(Action)
    // {
    //   case boundary:  
    //     break;      
    //   case avoid:
    //     break;
    //   case eat:
    //     break;
    //   case explore:
    //     break;
    //   case default:
    //     //do something
    // }


    //pick a direction to go based on food, poison, threats/predators, obstacles?

  

    

    //pick steering
      //runaway (poison and predators)
        //primary objective. dont die
      //hunt for food(food or other vehicles)
        //depending on health. may be weighed more
        //food closer weighs more
        //prevent infinte running away
      //boundaries
        // move away from the boundaries

    //apply force depending on what option  
  }

  this.clone = function() {
    if (random(1) < 0.004 * this.health / 100) {
      return new Vehicle(this.position.x, this.position.y, this.dna);
    } else {
      return null;
    }
  }

  this.eat = function(list, nutrition, perception) {
    var record = Infinity;
    var closest = null;
    for (var i = list.length - 1; i >= 0; i--) {
      var d = this.position.dist(list[i]);

      if (d < this.maxspeed) {
        list.splice(i, 1);
        this.health += nutrition;
      } else {
        if (d < record && d < perception) {
          record = d;
          closest = list[i];
        }
      }
    }

    // This is the moment of eating!

    if (closest != null) {
      return this.seek(closest);
    }

    return createVector(0, 0);
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

  this.dead = function() {
    return (this.health < 0)
  }

  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    var angle = this.velocity.heading() + PI / 2;

    push();
    translate(this.position.x, this.position.y);
    rotate(angle);


    if (debug.checked()) {
      strokeWeight(3);
      stroke(0, 255, 0);
      noFill();
      line(0, 0, 0, -this.dna[0] * 25);
      strokeWeight(2);
      ellipse(0, 0, this.dna[2] * 2);
      stroke(255, 0, 0);
      line(0, 0, 0, -this.dna[1] * 25);
      ellipse(0, 0, this.dna[3] * 2);
    }

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
    
    var centerPoint = createVector(width / 2, height / 2);

    var desired = null;

    if (this.position.x < boundary) {
      //desired = createVector(this.maxspeed, this.velocity.y);
       return this.seek(centerPoint);
    } else if (this.position.x > width - boundary) {
      //desired = createVector(-this.maxspeed, this.velocity.y);
      return this.seek(centerPoint);
    }

    if (this.position.y < boundary) {
      //desired = createVector(this.velocity.x, this.maxspeed);
      return this.seek(centerPoint);
    } else if (this.position.y > height - boundary) {
      //desired = createVector(this.velocity.x, -this.maxspeed);
      return this.seek(centerPoint);
    }
    
      return null   
    

    // if (desired !== null) {
    //   desired.normalize();
    //   desired.mult(this.maxspeed);
    //   var steer = p5.Vector.sub(desired, this.velocity);
    //   steer.limit(this.maxforce);
    //   return steer
    // }
  }
}
