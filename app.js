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
function createDinos() {
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
  const dinosArr = dinos.map((dino) => {
    const dinoObj = new Dino(
      dino.species,
      dino.weight,
      dino.height,
      dino.diet,
      dino.where,
      dino.when,
      dino.fact
    );
    return dinoObj;
  });
  dinosArr.splice(4, 0, "humanData");
  return dinosArr;
}
// Create Human Object

// Use IIFE to get human data from form
function getHumanData() {
  const name = document.querySelector("#name").value;
  const height =
    document.querySelector("#feet").value * 12 +
    document.querySelector("#inches").value;
  const weight = document.querySelector("#weight").value;
  const diet = document.querySelector("#diet").value;
  return {
    name: name,
    height: height,
    weight: weight,
    diet: diet,
  };
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function (human) {
  if (this.weight === human.weight) {
    return `${human.name} and ${this.species} are the same weight!`;
  } else if (this.weight > human.weight) {
    return `${human.name} weights ${this.weight - human.weight}lbs less than ${
      this.species
    }`;
  } else {
    return `${human.name} weights ${human.weight - this.weight}lbs more than ${
      this.species
    }`;
  }
};
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function (human) {
  if (this.diet.toLowerCase() === human.diet.toLowerCase()) {
    return `both ${this.species} and ${human.name} have the same diet (${this.diet})`;
  } else {
    return `${this.species}'s diet is ${this.diet}, ${human.name}'s diet is ${human.diet} `;
  }
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (human) {
  if (this.height === human.height) {
    return `Both ${human.name} and ${this.species} weight is the same`;
  } else if (this.height > human.height) {
    return `${human.name} height is ${this.height - human.height}in less than ${
      this.species
    }`;
  } else {
    return `${human.name} height is ${human.height - this.height}in more than ${
      this.species
    }`;
  }
};

// Generate Tiles for each Dino in Array
function generateTile(dino, human) {
  let fact;
  const randomNum =
    dino.species === "Pigeon" ? 0 : Math.round(Math.round(Math.random() * 5));

  switch (randomNum) {
    case 0:
      fact = dino.fact;
      break;
    case 1:
      fact = dino.compareWeight(human);
      break;
    case 2:
      fact = dino.compareDiet(human);
      break;
    case 3:
      fact = `$The ${dino.species} lived in ${dino.where}`;
      break;
    case 4:
      fact = `The ${dino.species} was born on the ${dino.when} period`;
      break;
    case 5:
      fact = dino.compareHeight(human);
      break;
    default:
      fact = "Dinosaurs no longer alive";
  }

  const div = document.createElement("div");
  div.className = "grid-item";

  div.innerHTML = `<h2>${
    dino.species
  }</h2> <img src='./images/${dino.species.toLowerCase()}.png' alt='a dinosaur picture'><p>${fact}</p>`;

  return div;
}

function generateHuman(human) {
  const div = document.createElement("div");

  div.className = "grid-item";
  div.innerHTML = `<h2>${human.name}</h2> <img src='./images/human.png' alt='a human picture'>`;

  return div;
}

// Add tiles to DOM
function addToDom(dinos, human) {
  // Remove form from screen
  document.querySelector("#dino-compare").style.display = "none";
  const grid = document.getElementById("grid");
  for (let i = 0; i < 9; i++) {
    if (i === 4) {
      grid.appendChild(generateHuman(human));
    } else {
      grid.appendChild(generateTile(dinos[i], human));
    }
  }
}

// On button click, prepare and display infographic

function btnClicked(evt) {
  evt.preventDefault();

  const human = getHumanData();

  const dinos = createDinos();

  addToDom(dinos, human);
}

document.getElementById("btn").addEventListener("click", btnClicked);
