
function nextGeneration() {
    // console.log('next generation');
    generation++
    
    let best = calculateFitness();  

    let temp = []
    for (let i = 0; i < best.length; i++) {
      let child0 = new Vehicle (best[i].brain)
      child0.rgb = [0,255,0]
      temp.push(child0);
      

      for(let j = 0; j< 14; j++)
      {
        let child = new Vehicle(best[i].brain);
        child.brain.mutate(mr);
        child.rgb = [0,0,255]
        temp.push(child)
      }
    }

    for (let i = temp.length; i < POPSIZE; i++) {
      // temp[i] = pickOne();
      let child1 = new Vehicle();
      child1.rgb = [255,0,0]
      temp.push(child1)
    }

    for (let i = 0; i < vehicleDEAD.length; i++) {
      vehicleDEAD[i].brain.dispose();
    }
    for (let i = 0; i < vehicle.length; i++) {
      vehicle[i].brain.dispose();
    }
    vehicle = temp;
    // console.log (temp)
    
  }
  
  // function pickOne() {
  //   let index = 0;
  //   let r = random(1);
  //   while (r > 0) {
  //     r = r - vehicle[index].fitness;
  //     index++;
  //   }
  //   index--;
  //   let temp = vehicle[index];
  //   let child = new Vehicle(temp.brain);
  //   child.brain.mutate(mr);
  //   return child;
  // }
  
  function calculateFitness() {
    let sum = 0;
    let topFit = 0;
    let best = [];
    for (let v of vehicleDEAD) {
      v.score *= pow(v.score, 2);
      let score = v.score 

      if (score > topFit)
      {
        topFit = score;

        if (bestNum < best.length )
        
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

    // console.log("-------------")
    for (let v of vehicleDEAD) {
      // v.fitness = v.score / sum;
      v.fitness = v.score / topFit;

      // console.log(v.score)
      // console.log(v.fitness)
    }

    //TODO MEMORY LEAK?
    // console.log(best.length)
    // console.log(tf.memory())
    return best
  }