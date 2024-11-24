// Select the canvas and get the context
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

// Variables to store map features
let cities = [];
let rivers = [];
let mountains = [];

// Generate Random Map
function generateMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cities = [];
    rivers = [];
    mountains = [];

    // Generate mountains
    for (let i = 0; i < 5; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        mountains.push({ x, y });
        drawMountain(x, y);
    }

    // Generate rivers
    for (let i = 0; i < 3; i++) {
        let startX = Math.random() * canvas.width;
        let startY = Math.random() * canvas.height;
        let endX = Math.random() * canvas.width;
        let endY = Math.random() * canvas.height;
        rivers.push({ startX, startY, endX, endY });
        drawRiver(startX, startY, endX, endY);
    }

    // Generate cities
    for (let i = 0; i < 5; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        cities.push({ x, y, name: `City ${i + 1}`, description: `Description for City ${i + 1}` });
        drawCity(x, y);
    }
}

// Draw Mountains
function drawMountain(x, y) {
    ctx.fillStyle = '#8B4513'; // Brown color for mountains
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 20, y + 40);
    ctx.lineTo(x + 20, y + 40);
    ctx.closePath();
    ctx.fill();
}

// Draw Rivers
function drawRiver(startX, startY, endX, endY) {
    ctx.strokeStyle = '#1E90FF'; // Blue color for rivers
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

// Draw Cities
function drawCity(x, y) {
    ctx.fillStyle = '#FF4500'; // Orange color for cities
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
}

// Handle Clicks on Cities
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    cities.forEach(city => {
        const distance = Math.sqrt((x - city.x) ** 2 + (y - city.y) ** 2);
        if (distance < 10) {
            showCityInfo(city);
        }
    });
});

// Show city information
function showCityInfo(city) {
    alert(`${city.name}\n${city.description}`);
}

// Export canvas as PNG
function exportAsPNG() {
    const link = document.createElement('a');
    link.download = 'fantasy_map.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Event listeners for buttons
document.getElementById('generate-map').addEventListener('click', generateMap);
document.getElementById('export-png').addEventListener('click', exportAsPNG);

// Initial map generation
generateMap();
