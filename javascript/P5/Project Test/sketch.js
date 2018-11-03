
var ship;
var enemys = [];
var bullets = [];
var enemyCount = 5;



function setup() {
  
  createCanvas(400,400); 

  ship = new Ship();  
  
  for(var i = 0; i < enemyCount ; i++)
  {
    enemys[i] = new Enemy((width / enemyCount) * i + 50,20)
  } 
}

function draw() {  

  background (51); 
  ship.show();
  
  for(var i = bullets.length -1; i >=0  ; i--)
  {
    
    for(var j = 0; j < enemys.length ; j++)
    {
      if (bullets[i].hits(enemys[j])){      
        enemys[j].damage(bullets[i]);
        bullets[i].use();
      }
    }


    if(bullets[i].toDelete){
      bullets.splice(i,1);
    }
    else{
      bullets[i].show();
      bullets[i].move();
    }  

  }

  for(var i = enemys.length-1; i >= 0  ; i--)
  {
    if (enemys[i].toDelete){
      enemys.splice(i,1);
    }
    else
    {
      enemys[i].show();
    }
  }




  if (enemys.length === 0)
  {
    print("YOU WIN");
  }


}


function keyPressed() {

  if (key === ' '){
    
    var bullet = new Bullet(ship.x,height);
    bullets.push(bullet);    
  }

	if (keyCode === RIGHT_ARROW){
		ship.move(1);
	}
	else if (keyCode === LEFT_ARROW){
		ship.move(-1);	
	}
}



















//GARBAGE

  //console.log("draw fucntion!")
  //console.log(frameCount)
  //print("setup function!");

  //rect(50,100,20,10);
