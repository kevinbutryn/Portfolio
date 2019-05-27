
function nextGeneration() {
    console.log('next generation');
    
    let best = calculateFitness();
    let temp = []
    for (let i = 0; i < best.length-1; i++) {
      temp[i] = new Vehicle (best[i].brain);
    }

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
        // best.push(new Vehicle(v.brain))
        best.push(v)
        // console.log("-----")
        // console.log(v.score)
      }
      if (score == topFit && bestNum > best.length)
      {
        // best.push(new Vehicle(v.brain))
        // console.log (best)
        best.push(v)
      }

    }

    // console.log (topFit)

    for (let v of vehicle) {
      // v.fitness = v.score / sum;
      v.fitness = v.score / topFit;

      // console.log("-----")
      // console.log(v.score)
      // console.log(v.fitness)
    }

    //TODO MEMORY LEAK?
    // console.log(best.length)
    // console.log(tf.memory())
    return best
  }