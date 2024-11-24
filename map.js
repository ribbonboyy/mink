// Initialize the map and set view to an initial position
const map = L.map('map').setView([20, 0], 3);

// Add Stamen Watercolor fantasy-style tile layer
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
    maxZoom: 16,
    attribution: '&copy; <a href="http://stamen.com">Stamen Design</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Array of city data with names, descriptions, and coordinates
const cityData = [
    { name: "Eldoria", description: "A bustling port city known for its skilled sailors and merchants.", lat: 10, lng: -20 },
    { name: "Mistral Peaks", description: "A secluded mountain village famous for its rare herbs.", lat: 30, lng: 15 },
    { name: "Dragon's Keep", description: "A fortress with rumors of a dragon sighting.", lat: -15, lng: 45 },
    { name: "Whispering Woods", description: "An ancient forest filled with magic and mystery.", lat: 5, lng: -50 },
    { name: "Shimmerlake", description: "A quiet town by a lake that glows under the moonlight.", lat: 25, lng: -10 }
];

// Add each city marker with a popup containing the name and description
cityData.forEach(city => {
    const marker = L.marker([city.lat, city.lng]).addTo(map);
    marker.bindPopup(`<b>${city.name}</b><br>${city.description}`);
});

// Export map as PNG using html2canvas
document.getElementById('export-png').addEventListener('click', function() {
    html2canvas(document.querySelector("#map")).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'fantasy_map.png';
        link.click();
    });
});
