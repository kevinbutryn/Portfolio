
function pipe(){

    this.width = 20;
    this.speed = 2;
    this.opening = 125;
    this.x = width;
    this.y = 0
    this.bottom_opening = random(height*.2,height*.8);
    this.top_opening = this.bottom_opening + this.opening;


    this.show = function(){
        fill(55,180,60);
        rect (this.x,this.y,this.width,this.bottom_opening);
        rect (this.x,this.top_opening,this.width,height);



    }

    this.update = function(){
        this.x -= this.speed;
    }

    this.offscreen = function(){
        if (this.x + this.width < 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

}