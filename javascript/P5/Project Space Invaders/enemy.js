function Enemy(x,y){

	this.x = x;
	this.y = y;
	this.health = 100;
	this.toDelete = false;

	this.show = function() {

		fill(0,255,0);

		rectMode(CENTER);
		ellipse(this.x, this.y,30, 20 )
	}

	this.damage = function(bullet){
		this.health = (this.health - bullet.damage);


		if (this.health <= 0 ){
			this.toDelete = true;
		}
		else
		{
			print("Health = " + this.health);
		}
		
	}


}