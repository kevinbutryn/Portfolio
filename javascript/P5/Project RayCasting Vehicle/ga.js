
function nextGeneration() {
    console.log('next generation');
    
    let temp = calculateFitness();
    
    for (let i = temp.length; i < POPSIZE; i++) {
      temp[i] = pickOne();
    }

    for (let i = 0; i < POPSIZE; i++) {
      vehicle[i].brain.dispose();
    }
    vehicle = temp;
    
  }
  
  function pickOne() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
      r = r - vehicle[index].fitness;
      index++;
    }
    index--;
    let temp = vehicle[index];
    let child = new Vehicle(temp.brain);
    child.brain.mutate(mr);
    return child;
  }
  
  function calculateFitness() {
    let sum = 0;
    let topFit = 0;
    let best = [];
    for (let v of vehicle) {
      // v.calcFit();
      v.score *= 100;
      let score = v.score 
      sum += score ;

      if (score > topFit)
      {
        topFit = score;
        best = []
        best.push(new Vehicle(v.brain))
        console.log("-----")
        console.log(v.score)
      }
      if (score == topFit)
      {
        best.push(new Vehicle(v.brain))

      }
    }

    for (let v of vehicle) {
      v.fitness = v.score / sum;
      // console.log("-----")
      // console.log(v.score)
      // console.log(v.fitness)
    }
    if (best.length > bestNum)
    {
      return best.splice(0,bestNum)
    }
    else
    {
      return best
    }
  }