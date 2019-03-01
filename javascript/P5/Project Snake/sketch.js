var rows, cols;
let scale = 20;
let yoff = 0.0;
let roughness = .1;
let low = 0;
let high = 300;

function setup() {
  createCanvas(800,1000,WEBGL);
  
  rows = width / scale;
  cols = height / scale;

  r1 = 50;
  g1 = 120;
  b1 = 50;

  r2 = 80;
  g2 = 60;
  b2 = 60;

  c2 = color(r1,g1,b1);
  c1 = color(r2,g2,b2);
  

}


function draw() {
  background(51);


  translate(-height/2, 200 , height/2 - 200);
  rotateX(PI + PI/3);
  

  strokeWeight(1);
  
  stroke(8);
  // fill(255,0,0);



  for (var y = 0; y <= rows; y++){

    beginShape(TRIANGLE_STRIP);

    for (var x = 0; x <= cols; x++){
      x1 = x * scale;
      x2 = x * scale;
      y1 = y * scale;
      y2 = (y+1) * scale;
      z1 = map( noise(x * roughness, y * roughness + yoff     ) , 0 , 1 , low , high )
      z2 = map( noise(x * roughness, (y+1) * roughness  + yoff) , 0 , 1 , low , high )

      let color = lerpColor(c1,c2,map(z1, low, high, 0, 1))
      fill(color);
      vertex(x1, y1, z1);
      vertex(x2, y2, z2);
    }

    endShape();
  }

   yoff += .01; //speed at which the ground moves
}
