// Initialize the map
const map = L.map('map').setView([20, 0], 2); // Centered at [lat, lng], zoom level 2

// Add a fantasy map tile layer
L.tileLayer('https://tile-examples.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 6,
    attribution: '&copy; <a href="https://azgaar.github.io/Fantasy-Map-Generator/">Azgaar\'s Fantasy Map Generator</a>',
}).addTo(map);

// Store markers for interactive elements
const cities = [];

// Generate random city markers
function generateCities() {
    for (let i = 0; i < 5; i++) {
        // Generate random lat/lng positions
        const lat = Math.random() * 140 - 70;  // Random latitude
        const lng = Math.random() * 360 - 180; // Random longitude

        const city = L.marker([lat, lng]).addTo(map);
        city.bindPopup(`<b>City ${i + 1}</b><br>Random lore and details.`);

        cities.push(city);
    }
}

// Generate Cities on Page Load
generateCities();

// Export map as PNG using Leaflet's print control
document.getElementById('export-png').addEventListener('click', function() {
    map.once('postcompose', function(event) {
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'fantasy_map.png';
        link.click();
    });
});
