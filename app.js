// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

// Create Dino Objects
function createDinoObjs() {
  const dinos = [
    {
      species: "Triceratops",
      weight: 13000,
      height: 114,
      diet: "herbavor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "First discovered in 1889 by Othniel Charles Marsh",
    },
    {
      species: "Tyrannosaurus Rex",
      weight: 11905,
      height: 144,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "The largest known skull measures in at 5 feet long.",
    },
    {
      species: "Anklyosaurus",
      weight: 10500,
      height: 55,
      diet: "herbavor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Anklyosaurus survived for approximately 135 million years.",
    },
    {
      species: "Brachiosaurus",
      weight: 70000,
      height: "372",
      diet: "herbavor",
      where: "North America",
      when: "Late Jurasic",
      fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
    },
    {
      species: "Stegosaurus",
      weight: 11600,
      height: 79,
      diet: "herbavor",
      where: "North America, Europe, Asia",
      when: "Late Jurasic to Early Cretaceous",
      fact: "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
    },
    {
      species: "Elasmosaurus",
      weight: 16000,
      height: 59,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
    },
    {
      species: "Pteranodon",
      weight: 44,
      height: 20,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
    },
    {
      species: "Pigeon",
      weight: 0.5,
      height: 9,
      diet: "herbavor",
      where: "World Wide",
      when: "Holocene",
      fact: "All birds are living dinosaurs.",
    },
  ];
  return dinos.map(
    (dino) =>
      new Dino(
        dino.species,
        dino.weight,
        dino.height,
        dino.diet,
        dino.where,
        dino.when,
        dino.fact
      )
  );
}

// Create Human Object
function Human(name, height, weight, diet) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}

// Use IIFE to get human data from form
function createHuman() {
  return (function () {
    const name = document.getElementById("name").value;
    const height =
      Number(document.getElementById("feet").value) * 12 +
      Number(document.getElementById("inches").value);
    const weight = document.getElementById("weight").value;
    const diet = document.getElementById("diet").value;

    return new Human(name, height, weight, diet);
  })();
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function (human) {
  console.log(this);
  if (this.weight > human.weight) {
    return `${human.name}'s wieghts ${
      Number(this.weight) - Number(human.weight)
    }lbs less than ${this.species}`;
  } else if (this.weight < human.weight) {
    return `${human.name}'s wieghts ${
      human.weight - this.weight
    }lbs more than ${this.species}`;
  } else {
    return `Both ${this.species} & ${human.name} weight ${this.weight}`;
  }
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (human) {
  console.log(this);
  if (this.height > human.height) {
    return `${human.name}'s height is ${
      this.height - human.height
    }inches shorter than ${this.species}`;
  } else if (this.height < human.height) {
    return `${human.name}'s height is ${
      human.height - this.height
    }inches taller than ${this.species}`;
  } else {
    return `Both ${this.species} & ${human.name} height is ${this.height}`;
  }
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function (human) {
  console.log(this);
  if (this.diet === human.diet) {
    return `Both ${this.species} & ${human.name} are ${this.diet}s`;
  } else {
    return `${this.species}'s diet is ${this.diet}, ${human.name}'s diet is ${human.diet}`;
  }
};

// Generate Tiles for each Dino in Array
function generateHumanTile(human) {
  return `<h3>${human.name}</h3><img src='./images/human.png' alt='human image'>`;
}

function generateFact(dino, human) {
  console.log(dino.compareWeight(human));
  let fact;
  const randomNum =
    dino.species === "Pigeon" ? 0 : Math.floor(Math.random() * 6);
  switch (randomNum) {
    case 0:
      fact = dino.fact;
      break;
    case 1:
      fact = dino.compareWeight(human);
      break;
    case 2:
      fact = dino.compareHeight(human);
      break;
    case 3:
      fact = dino.compareDiet(human);
      break;
    case 4:
      fact = `${dino.species} used to live in ${dino.where}`;
      break;
    case 5:
      fact = `${dino.species} used to live in ${dino.when} era`;
      break;
  }
  return fact;
}

function generateTile(dino, human, i) {
  const dinoDiv = document.createElement("div");
  dinoDiv.className = "grid-item";
  if (i === 4) {
    dinoDiv.innerHTML = generateHumanTile(dino);
  } else {
    const fact = generateFact(dino, human);
    dinoDiv.innerHTML = `<h3>${dino.species}</h3><img src='./images/${dino.species}.png'><p>${fact}</p>`;
  }
  return dinoDiv;
}
// Add tiles to DOM
function addTilesToDom(dinos, human) {
  const grid = document.getElementById("grid");
  dinos.splice(4, 0, createHuman());
  dinos.forEach((dino, i) => {
    const tile = generateTile(dino, human, i);
    grid.appendChild(tile);
  });
}

// Remove form from screen
function removeForm() {
  document.getElementById("dino-compare").style.display = "none";
}

// On button click, prepare and display infographic
function displayInfoGraphic(evt) {
  evt.preventDefault();
  const human = createHuman();
  const dinos = createDinoObjs();

  removeForm();
  addTilesToDom(dinos, human);
}

(function () {
  document.getElementById("btn").addEventListener("click", displayInfoGraphic);
})();
