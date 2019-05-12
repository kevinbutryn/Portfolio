class Ray{
  
    constructor(pos, angle){
        this.pos = pos; //createVector(x,y);
        this.dir = p5.Vector.fromAngle(angle);
        this.pt = null;
    }

    lookAt(x, y){
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    show(){
        stroke(255,100);
        
        if (this.pt){
            line(this.pos.x,this.pos.y, this.pt.x, this.pt.y);
            //ellipse(this.pt.x,this.pt.y, 10,10)
        }else{
            //fill (255,0,0)
            line(this.pos.x,this.pos.y, this.pos.x + this.dir.x * 600, this.pos.y + this.dir.y * 600);
        }
    }

    update(walls){
        this.pt = null;
        let best_pt = null;

        let best_d = Infinity;

        for(let wall of walls){
            let temp_pt = null;
            let d = Infinity;

            temp_pt = this.cast(wall);

            if (temp_pt)
            {
                d = dist (this.pos.x, this.pos.y, temp_pt.x, temp_pt.y)
                if (d < best_d){
                    best_d = d;
                    best_pt = temp_pt;
                }
            }
        }
        this.pt = best_pt;
    }

    cast(wall){
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        //checks the ray and wall not parallel
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0){
            return false;
        }
        
        //checks the direction of the ray against wall
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (u <= 0){
            return false;
        }

        //checks the intersection point of the ray and wall
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        if (t <= 0 || t >= 1){
            return false;
        }


        const pt = createVector();
        pt.x = x1 + t * (x2 - x1);
        pt.y = y1 + t * (y2 - y1);
        return pt;
    }
}