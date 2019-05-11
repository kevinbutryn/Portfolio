let angle = 0;

function setup() {
  createCanvas(600,600,WEBGL);
  
}


function draw() {

    background(0);
    rectMode(CENTER);

    let w = 40;
    let spacing = 10;

    let cols = 3;
    let rows = 3;
    let layers = 3;

    let middle = w * 1 + spacing ; // because boxes are drawn centering around point


    // (-left/+right) (-up/+down) (-backward/+forward)
    translate(-middle,-middle,0)

    ////////////// rotate whole cube 

    // roll forward+ backward-
    rotateX(angle * .25)

    // rotate left+ right- 
    rotateY(angle * .25)

    // roll right+ left-
    rotateZ(angle * .25)

    //////////////

    //rotateY(angle * .25);
    //rotateX(-QUARTER_PI);
    //rotateY(HALF_PI * .8)

    for (let z = 0; z < (w+ spacing) * layers; z += w + spacing)
    {
      
      //translate(-middle,-middle,0)
      //rotateY(angle * .25)
      //translate(0,0,z)
      
      for (let y = 0; y < (w + spacing ) * rows; y += w + spacing)
      {

        for (let x = 0; x < (w + spacing) * cols; x += w + spacing)
        {
          push();
          translate (x, z, y);
          
          // rotate individule cube 
          //rotateY(angle);

          box(w, w, w);

          pop();
          
        }
      }
    }

    angle += .01;
}


