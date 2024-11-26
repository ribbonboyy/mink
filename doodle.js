// Silly character data
const adjectives = ["Goofy", "Wobbly", "Sassy", "Dizzy", "Fluffy", "Tiny", "Bouncy"];
const nouns = ["Penguin", "Banana", "Potato", "Unicorn", "Alien", "Blob", "Cactus"];

const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#f5ff33", "#ff8c33"];

// Generate random silly character
function getRandomCharacter() {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
}

// Create random doodle
function createRandomDoodle() {
    const doodleCanvas = document.getElementById("doodleCanvas");
    doodleCanvas.innerHTML = ""; // Clear previous doodle

    // Random number of shapes
    const numShapes = Math.floor(Math.random() * 5) + 3;

    for (let i = 0; i < numShapes; i++) {
        const shape = document.createElement("div");
        const size = Math.floor(Math.random() * 50) + 30;

        // Random shape properties
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.background = colors[Math.floor(Math.random() * colors.length)];
        shape.style.borderRadius = Math.random() > 0.5 ? "50%" : "0%";
        shape.style.position = "absolute";
        shape.style.left = `${Math.random() * (200 - size)}px`;
        shape.style.top = `${Math.random() * (200 - size)}px`;

        doodleCanvas.appendChild(shape);
    }
}

// Update character and doodle
function generateCharacter() {
    const descriptionElement = document.getElementById("characterDescription");
    const newCharacter = getRandomCharacter();

    createRandomDoodle();
    descriptionElement.textContent = `Meet the ${newCharacter}!`;
}

// Event listener
document.getElementById("generateButton").addEventListener("click", generateCharacter);
