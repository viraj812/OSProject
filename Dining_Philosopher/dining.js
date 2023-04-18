function addText(text){
    var box = document.getElementById("SimulationBox");
    var para = document.createElement("p");
    var content = document.createTextNode(text);
    box.appendChild(para);
    para.appendChild(content);

    box.scrollTop = box.scrollHeight;
}

class Semaphore {
    constructor(value) {
      this.value = value;
      this.queue = [];
    }
  
    acquire() {
      return new Promise(resolve => {
        if (this.value > 0) {
          this.value--;
          resolve();
        } else {
          this.queue.push(resolve);
        }
      });
    }
  
    release() {
      this.value++;
      const nextResolve = this.queue.shift();
      if (nextResolve) {
        nextResolve();
      }
    }
  }
  
  class Philosopher {
    constructor(name, leftFork, rightFork) {
      this.name = name;
      this.leftFork = leftFork;
      this.rightFork = rightFork;
      this.eating = false;
    }
  
    async eat() {
      const { name, leftFork, rightFork } = this;
  
      if (this.eating) {
        console.log(`${name} is already eating`);
        addText(`${name} is already eating`);
        return;
      }
  
      console.log(`${name} is Thinking`);
      addText(`${name} is Thinking`);

      await leftFork.acquire();
      console.log(`${name} has acquired left fork`);
      addText(`${name} has acquired left fork`);
      await rightFork.acquire();
      console.log(`${name} has acquired right fork`);
      addText(`${name} has acquired right fork`);
  
      console.log(`${name} is eating`);
      addText(`${name} is eating`);

      this.eating = true;
      await new Promise(resolve => setTimeout(resolve, Math.random() * 5000 + 1000));
      console.log(`${name} has finished eating`);
  
      leftFork.release();
      console.log(`${name} has released left fork`);
      addText(`${name} has released left fork`);
      rightFork.release();
      console.log(`${name} has released right fork`);
      addText(`${name} has released right fork`);
  
      this.eating = false;
    }
  }
  
  function startDining() {
    var numPhilosophers = document.getElementById("numPhilosophers").value;
    numPhilosophers = parseInt(numPhilosophers);

    const forks = Array.from({ length: numPhilosophers }, (_, i) => new Semaphore(1));
    const philosophers = Array.from({ length: numPhilosophers }, (_, i) => {
      const leftFork = forks[i];
      const rightFork = forks[(i + 1) % numPhilosophers];
      return new Philosopher(`Philosopher ${i + 1}`, leftFork, rightFork);
    });
  
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * numPhilosophers);
      philosophers[randomIndex].eat();
    }, 3000);
  }

  // startDining(numPhilosophers);
  