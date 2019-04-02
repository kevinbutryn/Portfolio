let angle = 0;

function setup() {
  createCanvas(400,400,WEBGL);
  
}


function draw() {

    background(0);
    //translate (0, height / 2);
    rectMode(CENTER);

    let h = 100;
    let w = 10;

    let cols = 5;
    let rows = 5;

    rotateY(angle * .25);
    rotateX(-QUARTER_PI);

    let offset = 0;
    for (let y = 0; y < w * rows; y += w)
    {
      for (let x = 0; x < w * cols; x += w)
      {
        push();
        translate (x, 0, y);

        a = angle + offset;
        zval = sin(a);

        z = map (zval, 0, 1 , 0 , h)

        //rect (x + w/2, 0, w, y);
        box(w, z, w)

        offset += 0.15;

        pop();
      }
    }
    angle += .01;
}


