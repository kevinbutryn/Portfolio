function Ship()	{

	this.x = width/2

	this.show = function() {
		fill(255);
		rectMode(CENTER);
		rect(this.x, height-20,20, 20 )
	}

	this.move = function(dir) {
		this.x += dir*5;
	}

	this.getX = function(){
		return this.x;
	}
	this.getY = function(){
		return this.y;
	}
}