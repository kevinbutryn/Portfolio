var gravity = -.5;
var lift = 12;
var velocity = 0
var maxFallSpeed = -7;
var maxFlySpeed = 10;



function Bird(){

    this.x = 40;
    this.y = height/2;



this.show = function() {

 fill(255);   
 ellipse(this.x,this.y,20,20);

}

this.update = function(){
    velocity += gravity;
    this.y -= velocity;

    if (this.y < 0){
        this.y = 0;
        velocity = 0;
    }

    if (this.y > height){
        this.y = height;
        velocity = maxFallSpeed;
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



}