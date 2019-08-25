class Ground extends Body{
    constructor(x, y, w, h){
        super(x,y,w,h)

        this.body = Matter.Bodies.rectangle(x, y, w, h);
        World.add(world, this.body)
        this.w = w;
        this.h = h;

        this.body.isStatic = true;
    }

    show() {
        const pos = this.body.position;
        const angle = this.body.angle;

        push();
            translate(pos.x,pos.y);
            rotate(angle);
            fill(150,200,50);
            rectMode(CENTER);
            rect (0, 0, this.w, this.h);
        pop();
    }

    update() {
        
    }
}