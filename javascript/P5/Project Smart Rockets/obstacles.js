function Obstacles(num)
{
	var objects = [];

	for (var i = 0; i < num; i++){
		var rx = floor(random(width));
		var ry = floor(random(height));
		var rw = floor(random(10,50));
		var rh = floor(random(10,50));
		var stuff = [];
		stuff.push(rx,ry,rw,rh);
		
		objects.push(stuff);
	}


	this.display = function()
	{
		for(var i = 0; i < num; i++)
		{
			var cord = objects[i];			
			rect(cord[0],cord[1],cord[2],cord[3]);
		}

	}

	this.intersect = function(x,y){
		for(var i = 0; i < num; i++)
		{
			var cord = objects[i];			
			var rx = cord[0];
			var ry = cord[1];
			var rw = cord[2];
			var rh = cord[3];

			if (x> rx && x < rx + rw && y > ry && y < ry + rh)
			{return true;}
		}
		return false;
	}
}