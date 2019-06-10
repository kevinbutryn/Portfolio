let walls = [];
let gates = [];
let vehicle = [];
let dir = '';
let start,end;
let brain;
let SIGHT = 300;
let POPSIZE = 100;
let mr = .1
let center;
let points = [];
let Twidth = 40;
let bestNum = 5;



function setup() {


  tf.setBackend('cpu');
  createCanvas(800,800);
  createBoundaries();

  for(let j = 0; j < POPSIZE; j++){
    vehicle.push(new Vehicle())
  }
  center = createVector(width/ 2, height/2 );
  sliderLength = createSlider(1, 100, 1, 5)

  button = createButton('killAll');
  // button.position(19, 19);
  button.mousePressed(killAll);

  button1 = createButton('saveModel');
  button1.mousePressed(saveBest);

  button1 = createButton('LoadModel');
  button1.mousePressed(loadBest);
}


function draw() {
    background(0);
    let speed = sliderLength.value();
    for(let i = 0; i < speed; i++)
    {
      let alive = false;
      for(let j = 0; j < POPSIZE; j++){
        if(vehicle[j].alive){
          alive = true;
          // update particle and rays
          vehicle[j].update(walls);

          //show particle rays and DEBUG
          //vehicle[j].showRays();
        }
      }

      if (!alive )
      {
        nextGeneration();
      }
    }

    //draw the world, boundaries, vehicles
    drawWorld(); 

    //draw map logic
    // drawMakeMap();
    
  }

  //get map logic
  // function mousePressed() {
  //   let p = createVector(mouseX, mouseY)    
  //   points.push(p)
  // }

  function checkInput(input) {
  
    if (input === 0){
      dir = 'LEFT'
    }
    if (input === 1){
      dir = 'RIGHT'
    }
    if (input === 2){
      dir = 'FORWARD'
    }
    if (input === 3){
      dir = 'BACKWARD'
    }
    // if (keyIsDown(LEFT_ARROW)) {
    //   dir = 'LEFT'
    // }
  
    // if (keyIsDown(RIGHT_ARROW)) {
    //   dir = 'RIGHT'
    // }
  
    // if (keyIsDown(UP_ARROW)) {
    //   dir = 'FORWARD'	
    // }
  
    // if (keyIsDown(DOWN_ARROW)) {
    //   dir = 'BACKWARD'	
    // }
  }

  function keyReleased(){
    dir = 'DRAG'
  }

  // Regactor into new document
  function drawWorld(){
    // draw boundaries
    for (let wall of walls){
      wall.show();
    }

    for (let gate of gates){
      gate.show();
    }


    // draw start and end
    ellipse(start.x,start.y,10)
    ellipse(end.x,end.y,10)

    //show particle
    for(let j = 0; j < POPSIZE; j++){
      vehicle[j].show();
    }
  }

  function killAll(){
    for(let j = 0; j < POPSIZE; j++){
      vehicle[j].alive = false;
    }
  }

  // function saveBest(){
  //   let v = vehicle[0];
  //   // saveJSON(v.brain, 'brain.json');

  //   await v.brain.save('downloads://my-model');
  // }

  function saveBest(){
    let best = 0;
    let bestscore = 0;
    for(let j = 0; j < POPSIZE; j++){
      if (vehicle[j].score > bestscore)
      {
        best = j;
        bestscore = vehicle[j].score
      }
    }

    console.log(vehicle)
    console.log(best)
    console.log(vehicle[best].score)
    saveModel(best)
  }
  async function saveModel (best){
    //you can use await in here
    let v = vehicle[best];
    // await v.brain.model.save('downloads://my-model');
    await v.brain.model.save('file://model-1a');
  }

  async function loadBest (){
    const loadedModel = await tf.loadModel("localstorage://my-model-1");
    let v = new Vehicle(loadedModel)
    vehicle[0].dispose();
    vehicle[0] = v;
  }

  function createBoundaries(){
   
    let outer = [ 
      createVector(42, 269),
      createVector(38, 167),
      createVector(91, 70),
      createVector(191, 51),
      createVector(279, 150),
      createVector(303, 159),
      createVector(329, 148),
      createVector(545, 43),
      createVector(671, 24),
      createVector(766, 66),
      createVector(788, 204),
      createVector(787, 525),
      createVector(532, 411),
      createVector(499, 412),
      createVector(470, 435),
      createVector(468, 477),
      createVector(527, 554),
      createVector(718, 781),
      createVector(355, 788),
      createVector(121, 787),
      createVector(22, 643)
      ]
    let inner = [
      createVector(148, 271),
      createVector(143, 187),
      createVector(156, 171),
      createVector(170, 171),
      createVector(206, 240),
      createVector(290, 286),
      createVector(396, 245),
      createVector(589, 141),
      createVector(638, 147),
      createVector(645, 158),
      createVector(655, 206),
      createVector(700, 376),
      createVector(583, 324),
      createVector(467, 315),
      createVector(353, 396),
      createVector(345, 532),
      createVector(422, 635),
      createVector(505, 703),
      createVector(343, 705),
      createVector(177, 700),
      createVector(142, 637)
    ]
    //Random boundaries
    // for (let i = 0; i < 2; i++){
      // // random points
      // let x1 = random(0, width); 
      // let x2 = random(0, width);
      // let y1 = random(0, height);
      // let y2 = random(0, height);
  
      // // add random wall
      // walls.push (new Boundary(x1,y1,x2,y2));
    // }
  
    for(let b1 = 0; b1 < outer.length; b1 ++)
    {
      let b2 = b1 + 1
      if (b2 == outer.length)
      {
        b2 = 0
      }

      let start = outer[b1]
      let end = outer[b2]
      walls.push(new Boundary(start.x, start.y, end.x, end.y));
      ellipse(start.x,start.y,10)

      let start1 = inner[b1]
      let end1 = inner[b2]
      walls.push(new Boundary(start1.x, start1.y, end1.x, end1.y));


      gates.push(new Boundary(end.x, end.y, end1.x, end1.y));

    }
    // console.log(gates)
    // let temp = gates.splice(gates.length-1,1)
    // console.log(temp)
    // console.log(gates)
    // gates.push(temp)
    // console.log(gates)

    // create starting boundary
    // walls.push(new Boundary(inner[0].x, inner[0].y, outer[0].x, outer[0].y));

    // end and start
    start = createVector(95,250);
    end = createVector(95,350);
    
    //add edges
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(0, height, 0, 0));
  }


  function drawMakeMap(){
    for( let p in points){
      ellipse(points[p].x,points[p].y,5)       
      console.log(" createVector(" + points[p].x + ", "+ points[p].y + "),")
    }
    console.log("------")
  }




//// Garbage 

// for( let p in points){
//   // line(points[p].x,points[p].y,center.x,center.y)
//   angle = atan2(points[p].y - height / 2, points[p].x - width / 2)
//   d = dist(points[p].x , points[p].y , width / 2, height / 2)

//   let v = p5.Vector.fromAngle(angle);

//   ellipse(center.x + v.x*d,center.y + v.y*d,10)
//   ellipse(center.x + v.x*(d + Twidth),center.y + v.y*(d + Twidth),10)

// }


// for(let a = 0; a< 360; a+= 360/30)
// {
//   let x = cos(radians(a));
//   let y = sin(radians(a));
//   // console.log(x)
//   // console.log(y)
//   // let l = p5.Vector.fromAngle(a);
//   line(center.x,center.y, center.y + x * 150,center.y + y * 150)

// }