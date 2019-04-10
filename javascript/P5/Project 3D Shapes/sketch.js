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
    let default_h = 50;
    let spacing = 2;

    let cols = 10;
    let rows = 10;

    let middle_row = ((w + spacing) * rows) / 2;
    let middle_col = ((w + spacing) * cols) / 2;

    translate ( -middle_row , -middle_col,0 )

    rotateY(angle * .25);
    rotateX(-QUARTER_PI);
    
    //translate ( middle_row , middle_col,0 )

    let offset = 0;
    for (let y = 0; y < (w + spacing ) * rows; y += w + spacing)
    {
      for (let x = 0; x < (w + spacing) * cols; x += w + spacing)
      {
        push();
        translate (x, 0, y);

        a = angle + offset;
        zval = sin(a);

        z = map (zval, -1, 1 , 1 , h)

        //rect (x + w/2, 0, w, y);
        box(w, z + default_h, w)

        offset += 0.15;

        pop();
      }
    }

  
    

    console.log(middle_col)
    angle += .01;
}


