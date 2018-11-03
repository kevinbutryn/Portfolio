function Bullet(x,y){

	this.x = x;
	this.y = y;
	this.damage = 25;
	this.toDelete = false;

	this.show = function() {

		fill(255,255,0);

		rectMode(CENTER);
		ellipse(this.x, this.y,10, 40 )
	}

	this.move = function(){
		this.y = this.y - 5;
	}

	this.hits = function(enemy){
		var d = dist (this.x,this.y,enemy.x,enemy.y);

		if (d < 30)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	this.use = function(){
		this.toDelete = true;
	}
}