const gardenGrid = document.getElementById("garden-grid");
const waterAllBtn = document.getElementById("water-all");

const facts = [
  "A single tree can absorb as much as 48 pounds of CO2 per year!",
  "The Amazon Rainforest produces 20% of the world's oxygen.",
  "Earth's tallest tree, a redwood named Hyperion, is over 379 feet tall!",
  "A group of flamingos is called a 'flamboyance'.",
  "Octopuses have three hearts and blue blood.",
  "Cleopatra lived closer in time to the iPhone than the Great Pyramid.",
  "Napoleon was once attacked by a horde of bunnies during a hunt!",
  "The first oranges weren’t orange—they were green!",
  "Ice cream sundaes were created because serving soda on Sundays was frowned upon.",
  "A day on Venus is longer than a year on Venus.",
  "Neutron stars are so dense that a sugar-cube-sized piece weighs as much as a mountain!",
  "The Sun's core is about 27 million °F!",
  "Saturn's moon, Titan, has lakes of methane and ethane.",
  "Koalas have fingerprints almost identical to humans.",
  "A shrimp’s heart is located in its head.",
  "Sloths can hold their breath longer than dolphins—up to 40 minutes!",
  "Sea otters hold hands when they sleep to keep from drifting apart.",
  "Bubble wrap was originally invented as wallpaper.",
  "Wombat poop is cube-shaped!",
  "Cows have best friends and get stressed when separated.",
  "Hot water freezes faster than cold water—this is called the Mpemba effect.",
  "Bananas are radioactive because of their potassium content."
];


// Create a 5x5 grid of tiles
const gridSize = 5;
const garden = [];

for (let i = 0; i < gridSize * gridSize; i++) {
  const tile = document.createElement("div");
  tile.classList.add("garden-tile");
  tile.dataset.stage = "0"; // 0: Empty, 1: Seed, 2: Sprout, 3: Mature
  tile.addEventListener("click", () => plantOrWater(tile));
  garden.push(tile);
  gardenGrid.appendChild(tile);
}

// Plant or water logic
function plantOrWater(tile) {
  let stage = parseInt(tile.dataset.stage);

  if (stage === 0) {
    tile.dataset.stage = "1";
    tile.innerHTML = '<div class="plant"></div>';
  } else if (stage < 3) {
    tile.dataset.stage = (stage + 1).toString();
    const plant = tile.querySelector(".plant");
    if (stage === 1) plant.style.backgroundColor = "#4caf50"; // Sprout color
    if (stage === 2) {
      plant.classList.add("mature");
      tile.innerHTML = facts[Math.floor(Math.random() * facts.length)];
    }
  }
}

// Water all tiles
waterAllBtn.addEventListener("click", () => {
  garden.forEach(tile => {
    if (tile.dataset.stage > "0" && tile.dataset.stage < "3") {
      plantOrWater(tile);
    }
  });
});
