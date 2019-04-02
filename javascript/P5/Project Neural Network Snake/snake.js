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

    this.getInputs = function(){
        
        inputs = [];
        
        //8 from distance to walls
        inputs = this.dWalls();
        
        //8 from distance to self
        inputs = concat(inputs,this.dSelf());
        
        //8 from distance to food
        inputs = concat(inputs,this.dFood());

        return inputs;
    }

    this.dWalls = function(){
        Winputs = [];

        dtop = this.y ;
        dbottom = rows - this.y - 1 ; 
        dleft = this.x;
        dright = cols - this.x - 1;

        Winputs.push(dtop/scale);
        Winputs.push(dbottom/scale);
        Winputs.push(dleft/scale);
        Winputs.push(dright/scale);

        return Winputs;
    }

    this.dSelf = function(){
        Sinputs = [];
        dtop = scale;
        dbottom = scale;
        dleft = scale;
        dright = scale;

        for(var x = 1; x < this.length; x++){
            xpos = this.pastMoves[x].x;
            ypos = this.pastMoves[x].y;
            if (this.x == xpos){
                ydis = this.y - ypos;
                if (ydis > 0){
                    if (dtop > ydis)
                    {
                        dtop = ydis;
                    }
                }else{
                    if (dbottom > ydis * -1)
                    {
                        dbottom = ydis * -1;
                    }
                }

            }
            if (this.y == ypos){
                xdis = this.x - xpos;
                if (xdis > 0){
                    if (dleft > xdis)
                    {
                        dleft = xdis;
                    }
                }else{
                    if (dright > xdis * -1)
                    {
                        dright = xdis * -1;
                    }
                }
            }
        }
        

        Sinputs.push(dtop/scale);
        Sinputs.push(dbottom/scale);
        Sinputs.push(dleft/scale);
        Sinputs.push(dright/scale);

        return Sinputs;
    }

    this.dFood = function(){
        Finputs = [];

        dtop = scale;
        dbottom = scale;
        dleft = scale;
        dright = scale;

        if (this.x == this.fx){
            ydis = this.y - this.fy;
            
            if (ydis > 0){
                if (dtop > ydis)
                {
                    dtop = ydis;
                }
            }else{
                if (dbottom > ydis * -1)
                {
                    dbottom = ydis * -1;
                }
            }

        }
        if (this.y == this.fy){
            xdis = this.x - this.fx;
            
            if (xdis > 0){
                if (dleft > xdis)
                {
                    dleft = xdis;
                }
            }else{
                if (dright > xdis * -1)
                {
                    dright = xdis * -1;
                }
            }
        }


        Finputs.push(dtop/scale);
        Finputs.push(dbottom/scale);
        Finputs.push(dleft/scale);
        Finputs.push(dright/scale);
            
        return Finputs;
    }
}