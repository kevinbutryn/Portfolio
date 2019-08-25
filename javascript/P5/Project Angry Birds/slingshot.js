class SlingShot{
    constructor(x, y,len, body){
    
        const options = {
            pointA: {
                x: x,
                y: y
            },
            bodyB: body,
            stiffness: 0.5,
            length: len
        }

        this.sling = Constraint.create(options);
        World.add(world,this.sling);

    }
    fly() {
        this.sling.bodyB = null;
    }
    
    attach(body){
        this.sling.bodyB = body;
    }

    show() {
        if (this.sling.bodyB){
            stroke(255);
            const posA = this.sling.pointA;
            const posB = this.sling.bodyB.position;
            line(posA.x,posA.y,posB.x,posB.y)
        }
        stroke(0);
    }

    update() {
        
    }
}