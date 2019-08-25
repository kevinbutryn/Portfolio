class Box extends Body {
    constructor(x, y, w, h){

        super(x,y,w,h);
        this.body = Matter.Bodies.rectangle(x, y, w, h);
        World.add(world, this.body)
        this.w = w;
        this.h = h;


    }

    show() {
        const pos = this.body.position;
        const angle = this.body.angle;

        push();
            translate(pos.x,pos.y);
            rotate(angle);
            fill(255,100,100);
            rectMode(CENTER);
            rect (0, 0, this.w, this.h);
        pop();
    }

    update() {

    }
}