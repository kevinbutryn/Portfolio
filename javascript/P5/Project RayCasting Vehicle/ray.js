class Ray{
  
    constructor(pos, angle){
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
        this.pt = null;
        this.d = Infinity;
    }

    show(){
        //default color green
        stroke(0,255,0,100);

        // color code rays based on distance
        if(this.d < 400)
        {
            stroke(170,255,0,100); 
        }
        if(this.d < 300)
        {
            stroke(240,140,70,100);
        }
        if(this.d < 200)
        {
            stroke(255,100,0,100);
        }
        if(this.d < 100)
        {
            stroke(255,0,0,100);
        }

        // draw ray to point or infinity(600)
        if (this.pt){
            line(this.pos.x,this.pos.y, this.pt.x, this.pt.y);
        }else{
            line(this.pos.x,this.pos.y, this.pos.x + this.dir.x * 600, this.pos.y + this.dir.y * 600);
        }
    }

    // finds closest point of intersection of all boundaries
    update(walls){
        this.pt = null;
        this.d = Infinity;
        let best_pt = null;
        let best_d = Infinity;

        for(let wall of walls){
            let temp_pt = null;
            let temp_d = Infinity;

            temp_pt = this.cast(wall);

            if (temp_pt)
            {
                temp_d = dist (this.pos.x, this.pos.y, temp_pt.x, temp_pt.y)
                if (temp_d < best_d){
                    best_d = temp_d;
                    best_pt = temp_pt;
                }
            }
        }
        this.pt = best_pt;
        this.d = best_d;
    }

    // find point of intersection of ray to boundaries
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