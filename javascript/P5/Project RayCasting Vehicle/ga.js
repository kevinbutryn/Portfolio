function nextGeneration() {
    console.log('next generation');
    calculateFitness();
    let temp = [];
    for (let i = 0; i < POPSIZE; i++) {
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
    for (let v of vehicle) {
      v.calcFit();
      sum += v.fitness;
    }
    for (let v of vehicle) {
      v.fitness = v.fitness / sum;
    }
  }