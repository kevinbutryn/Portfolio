
function pipe(){

    this.width = 20;
    this.speed = 2;
    this.opening = 125;
    this.x = width;
    this.y = 0


    this.show = function(){
        fill(255);
        rect (this.x,this.y,this.width,height);

    }

    this.update = function(){
        this.x -= this.speed;
    }

}