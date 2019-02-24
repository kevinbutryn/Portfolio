var gravity = -.5;
var lift = 12;
var maxFallSpeed = -7;
var maxFlySpeed = 10;



function Bird(brain){

    this.x = 40;
    this.y = height/2;
  
    this.isDead = false;
    this.birdSize = 30;
    this.velocity = 0;
    this.score = 0;

    if (brain){
        this.brain = brain;
    }else
    {
        this.brain = new NeuralNetwork(5,4,2);
    }



    this.show = function() {        
            // noStroke();
            stroke(0);
            fill(240,240,50,70);
            ellipse(this.x,this.y,this.birdSize,this.birdSize);      
   }

    this.update = function(){

        this.velocity += gravity;
        this.y -= this.velocity;

        if (this.y < 0){          
            this.y = 0;
            this.velocity = 0;

        }

        if (this.y > height){
            this.isDead = true;
            // this.y = height;
            // velocity = maxFallSpeed;
        }

        if(this.velocity < maxFallSpeed )
        {
            this.velocity = maxFallSpeed;
        }

        if(this.velocity > maxFlySpeed){
            this.velocity = maxFlySpeed;
        }
    }

    this.fitness = function(){
        if(!this.isDead)
        {
            this.score = score;
        }
    }

    this.guess = function(pipes){

        var pipe = pipes[0];

        let inputs = [];
        inputs[0] = this.y; //bird y
        inputs[1] = pipe.x;//pipe x
        inputs[2] = pipe.top_opening; //pipe top opening
        inputs[3] = pipe.bottom_opening;//pipe bottom opening
        inputs[4] = this.velocity; //bird velocity
        let output = this.brain.predict(inputs);

        if (output[0] > output[1]){
            this.fly();
        }
    }

    this.fly = function(){
        this.velocity += lift;
    }

    this.gen_mutate = function(){        

        function mutate(x) {
          if (random(1) < 0.1) {
            let offset = randomGaussian() * 0.1;
            let newx = x + offset;
            return newx;
          } else {
            return x;
          }
        }

        
        this.brain.mutate(mutate);
    }


    this.hitPipe = function(pipes){

        var pipe = pipes[0];

        //bird points
        var bx1 = this.x + this.birdSize/2; // right side
        var bx2 = this.x - this.birdSize/2; // left side
        var by1 = this.y + this.birdSize/2; // bottom side
        var by2 = this.y - this.birdSize/2; // top side

        //pipe points    
        var px1 = pipe.x; //left x boundary
        var px2 = pipe.x + pipe.w; //right x boundary
        var pty1 = 0; // TOP top y boundary
        var pty2 = pipe.top_opening; // TOP bottom y boundary
        var pby1 = pipe.bottom_opening; // BOTTOM top y boundary
        var pby2 = height; // BOTTOM bottom y boundary
        
        if(
            (bx1 > px1) &&
            (by1 > pty1) &&
            (bx2 < px2) &&
            (by2 < pty2)
            )
        {
            //console.log("hit");
            this.isDead = true;
        } 

        if(
            (bx1 > px1) &&
            (by1 > pby1) &&
            (bx2 < px2) &&
            (by2 < pby2)
            )
        {
            //console.log("hit");
            this.isDead = true;
        }        

    }


}