function DNA(genes)
{
	

	if(genes)
	{
		this.genes = genes
	}
	else
	{
		this.genes = []
		for(var i = 0; i < lifeSpan; i++)
		{
			var force = p5.Vector.random2D().setMag(forceMulti);
			this.genes[i] = force;
		}
	}

	this.crossOver = function(partner){
		var newgenes = [];

		var mid = floor(random(this.genes.length));
		for (var i = 0; i < this.genes.length;i++){
			if (i> mid)
			{
				newgenes[i] = this.genes[i]; 
			}
			else
			{
				newgenes[i] = partner.genes[i];
			}
		}
		return new DNA(newgenes);
	}

	this.mutate = function(){

		for(var i = 0; i < this.genes.length; i++){
			if(random(1) < mutationRate)
			{
				this.genes[i] = p5.Vector.random2D().setMag(forceMulti);
			}
		}
	}
}