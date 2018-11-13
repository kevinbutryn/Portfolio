function Rocket(dna)
{

	this.pos = createVector(width/2, height-10);
	this.vel = createVector();	
	this.acc = createVector();
	this.count = 0;
	this.fitness = 0;
	this.completed = false;
	this.crashed = false;
	this.maxFitness = 0;
	this.col = [255,0,0]

	if (dna)
	{
		this.dna = dna;
	}
	else
	{
		this.dna = new DNA();
	}
	

	this.applyForce = function(force){
		this.acc.add(force);
	}

	this.update = function(){

		var d = dist(this.pos.x, this.pos.y, target.x, target.y)

		if(d < 10)
		{
			this.completed = true;
			this.pos = target.copy();
			foundPath = true;			
		}

		if (this.pos.x > width || this.pos.x < 0)
			{this.crashed = true;}
		if (this.pos.y > height || this.pos.y < 0)
			{this.crashed = true;}

		if(obstacles.intersect(this.pos.x,this.pos.y))
		//if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh)
			{this.crashed = true;}
		

		this.applyForce(this.dna.genes[count])			
		if(!this.completed && !this.crashed){
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
			this.vel.limit(4);
		}
		
	}

	this.calcFitness = function(){
		var d = dist(this.pos.x,this.pos.y, target.x, target.y);
		this.fitness = map (d ,0 ,width ,width ,0);
	
		if (this.completed){
			this.fitness *= 10;
		}
		if (this.crashed)
		{
			//this.fitness = 1;
		}

		if (this.maxFitness < this.fitness	 ){
			this.maxFitness	= this.fitness;
		}
	}

	this.show = function(){

		push();

		translate (this.pos.x, this.pos.y)
		rotate(this.vel.heading());


		noStroke();
		fill(255,100);

		rectMode(CENTER);
		triangle(-10,2,-10,-2,10,0)
		//rect(0,0, 20,4);

		fill(this.col[0],this.col[1],this.col[2],100)
		triangle(-10,8,-10,-8,0,0)

		pop();
	}

}