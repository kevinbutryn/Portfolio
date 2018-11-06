function Population()
{

	this.rockets = [];
	this.matingPool = [];
	this.popsize = 40


	for (var i = 0; i < this.popsize; i++){
		this.rockets.push(new Rocket());
	}

	this.spawn = function(){
		for(var i = 0; i < this.popsize; i++){
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}

	this.evaluate = function(){		
		var maxfit = 0;

		for(var i = 0; i < this.popsize; i++){
			this.rockets[i].calcFitness();
			if (this.rockets[i].fitness > maxfit)
			{
				maxfit = this.rockets[i].fitness;
			}
		}

		for(var i = 0; i < this.popsize; i++){			
			this.rockets[i].fitness /= maxfit;					
		}

		this.matingPool = [];

		for(var i = 0; i < this.popsize; i++){
			
			var n = this.rockets[i].fitness * 100;
			for(var j = 0; j < n ; j++)
			{
				this.matingPool.push(this.rockets[i]);
			}				
		}		
	}

	this.selection = function(){

		var newRockets = [];

		for(var i = 0; i < this.rockets.length;i++ ){

			var parentA = random(this.matingPool).dna; 
			var parentB = random(this.matingPool).dna;
			
			var child = parentA.crossOver(parentB);
			child.mutate();

			newRockets[i] = new Rocket(child);
			
		}

		this.rockets = newRockets;

	}

}