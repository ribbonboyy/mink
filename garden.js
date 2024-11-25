const gardenGrid = document.getElementById("garden-grid");
const waterAllBtn = document.getElementById("water-all");

// Sample facts
const facts = [
  "Did you know? Bananas are berries, but strawberries are not!",
  "The Eiffel Tower can grow by 6 inches during summer.",
  "Honey never spoils. Archaeologists have found 3,000-year-old honey!",
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
