const start_posx = mouseX;
const start_posy = mouseY;

class Particle{

  constructor() {
    this.pos = createVector(start_posx,start_posy);
    this.w = 4
  }

  show(){
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.w, this.w)
    (this.a.x, this.a.y, this.b.x, this.b.y);
  }

  update(){
    this.pos.x = mouseX;
    this.pos.y = mouseY;
  }
}

