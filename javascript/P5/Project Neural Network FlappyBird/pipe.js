
function pipe(){

    this.w = 30;
    this.speed = 3;
    this.opening = 150;
    this.x = width;
    this.y = 0
    this.top_opening = random(height*.1,height*.7);
    this.bottom_opening = this.top_opening + this.opening;     
    
    this.r = 55;
    this.g = 180;
    this.b = 60


    this.show = function(){
        fill(this.r,this.g,this.b);
        rect (this.x,this.y,this.w,this.top_opening); // top rectangle
        rect (this.x,this.bottom_opening,this.w,height); // bottom rectangle
    }

    this.update = function(){
        this.x -= this.speed;
    }

    this.offscreen = function(){
        if (this.x + this.w < 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }



}

