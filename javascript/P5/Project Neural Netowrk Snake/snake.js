function snake(){

    this.x = cols * .8;
    this.y = rows/2 - 1;
    this.direction = createVector(-1,0);

    this.fx = floor(random(0,rows));
    this.fy = floor(random(0,cols));

    this.length = 1;
    this.pastMoves = [];
    


    this.show = function(){
        
        fill(0,255,0);
        fxpos = this.fx * scale;
        fypos = this.fy * scale;
        rect(fxpos,fypos,scale,scale);


        fill(255,0,0);
        for(var x = 0; x < this.length; x++){
            xpos = this.pastMoves[x].x * scale;
            ypos = this.pastMoves[x].y * scale;
            rect(xpos,ypos,scale,scale);
        }
    }

    this.setDirection = function(direction){
        this.direction = direction;
    }

    this.update = function(){
        this.x += this.direction.x;
        this.y += this.direction.y;

        this.pastMoves = concat([ createVector(this.x,this.y)] , this.pastMoves) ;
        
        this.offMap();
        this.hitSelf();
        this.eat();

    }

    this.offMap = function(){
        if ((this.x < 0 || this.x > rows -1 ) || (this.y < 0 || this.y > cols - 1)){
            gameOver();
        }
    }

    this.hitSelf = function(){
        for(var x = 1; x < this.length; x++){
            xpos = this.pastMoves[x].x;
            ypos = this.pastMoves[x].y;
            if ((xpos == this.x) && (ypos == this.y)){
                gameOver();
            }
            
        }
    }

    this.eat = function(){
        if((this.x == this.fx) && (this.y == this.fy)){
            score++;
            this.food();
            this.length++;
        }    
    }

    this.reset = function(){
        this.x = cols * .8;
        this.y = rows/2 - 1;
        this.direction = createVector(-1,0);
        this.length = 1;
        score = 0;

        this.fx = floor(random(0,rows));
        this.fy = floor(random(0,cols));
        this.pastMoves = [];
    }

    this.food = function(){
        this.fx = floor(random(0,rows));
        this.fy = floor(random(0,cols));
        flag = true;
        while (flag){
            flag = false;
            for(var x = 0; x < this.length; x++){
                xpos = this.pastMoves[x].x;
                ypos = this.pastMoves[x].y;
                if (xpos == this.fx && ypos == this.fy){
                    flag = true;
                    this.fx = floor(random(0,rows));
                    this.fy = floor(random(0,cols));
                }
            }
        }
        
    }
}