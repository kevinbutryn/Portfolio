var gravity = -.5;
var lift = 12;
var velocity = 0
var maxFallSpeed = -7;
var maxFlySpeed = 10;



function Bird(){

    this.x = 40;
    this.y = height/2;
  
    this.isDead = false;
    this.birdSize = 30;



    this.show = function() {        
            noStroke();
            fill(240,240,50);
            ellipse(this.x,this.y,this.birdSize,this.birdSize);      
   }

    this.update = function(){

        velocity += gravity;
        this.y -= velocity;

        if (this.y < 0){          
            this.y = 0;
            velocity = 0;

        }

        if (this.y > height){
            this.isDead = true;
            // this.y = height;
            // velocity = maxFallSpeed;
        }

        if(velocity < maxFallSpeed )
        {
            velocity = maxFallSpeed;
        }

        if(velocity > maxFlySpeed){
            velocity = maxFlySpeed;
        }
    }

    this.fly = function(){
        velocity += lift;
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