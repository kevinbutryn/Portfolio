var best = .25;
var rand = .5;
var spawns = .25;

function Population()
{

	this.rockets = [];
	//this.matingPool = [];
	this.popsize = 20;
	this.topPool = [];
	this.randPool = [];
	this.spawnsPool = [];
	


	for (var i = 0; i < this.popsize; i++){
		this.rockets.push(new Rocket());
	}

	this.spawn = function(){
		for(var i = 0; i < this.popsize; i++){
			this.rockets[i].update();
			this.rockets[i].show();
			this.rockets[i].calcFitness();
		}
	}

	this.evaluate = function(){	
		this.topPool = [];
		this.randPool = [];
		this.spawnsPool = [];	
		
		this.rockets.sort(function(a,b){
			return b.maxFitness - a.maxFitness;
		})

				
		for(var i = 0; i < (this.popsize * best); i++){					
			this.topPool.push(this.rockets[i]);			
		}
		
		
	}

	this.selection = function(){

		var newRockets = [];

		for(var i = 0; i < this.popsize * spawns;i++ ){

			var parentA = random(this.topPool).dna; 
			var parentB = random(this.topPool).dna;
			
			var child = parentA.crossOver(parentB);
			child.mutate();

			var NewRock = new Rocket(child);
			NewRock.col = [0,255,0];
			newRockets.push(NewRock);
			
		}


		for(var i = 0; i < this.popsize* best;i++ )
		{	
				var NewRock1 = new Rocket(this.topPool[i].dna);
				NewRock1.col = [0,0,255];
				newRockets.push(NewRock1);
		}

		for(var i = 0; i < this.popsize* rand;i++ )
		{
			newRockets.push(new Rocket());			
		}

		this.rockets = newRockets;

	}

}