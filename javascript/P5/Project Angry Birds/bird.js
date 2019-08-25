class Bird{
    constructor(x, y, r){
        this.body = Matter.Bodies.circle(x, y, r);
        World.add(world, this.body)
        this.r = r * 2;
    }

    show() {
        const pos = this.body.position;
        const angle = this.body.angle;

        push();
            translate(pos.x,pos.y);
            rotate(angle);
            fill(255,255,0);
            ellipse(0, 0, this.r);
        pop();
    }
}