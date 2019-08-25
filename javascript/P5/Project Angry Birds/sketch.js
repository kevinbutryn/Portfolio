const {Engine,World,Bodies,MouseConstraint,Constraint,Mouse,Events,Render,Vector,Composites,Composite,Common,Runner} = Matter;


let bird;
let boxes = [];
let ground;
let slingshot;


let world, engine;
let mouse;



function setup() {
  const canvas = createCanvas(600,400);

  //create engine
  engine = Engine.create();
  world = engine.world;


  //create objects
  ground = new Ground(width/2, height-10, width, 20);
  bird = new Bird (150, 300, 25);
  slingshot = new SlingShot(150,300, 40, bird.body);

  for(let i = 0; i < 3; i++)
  {
    boxes[i] = new Box (450, 300 - i*75, 50, 75);
  }

  //set mouse contraints
  var mouse = Mouse.create(canvas.etl),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.6,
        length: 0,
        angularStiffness: 0,
        render: {
            visible: false
        }
    }
  });
  
    
  // add to world
  World.add(world, mouseConstraint); 
}

function keyPressed(){
    if(key == ' ')
    {
        World.remove(world,bird.body);
        bird = new Bird(150, 300, 25);
        slingshot.attach(bird.body)
    }
}
function mouseReleased(){
    setTimeout(() => {
        slingshot.fly();
    },15);
}
function draw() {
  background(0);
  Matter.Engine.update(engine);


  ground.show();
  bird.show();
  slingshot.show();
  for(let box of boxes){
    box.show();
  }
}


