// Check if the map element is available
if (document.getElementById('map')) {
    // Initialize the map at a central position with a zoom level
    const map = L.map('map').setView([20, 0], 3);

    // Add Stamen Watercolor fantasy-style tile layer for a fantasy look
    L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
        maxZoom: 16,
        attribution: '&copy; <a href="http://stamen.com">Stamen Design</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Confirm map is set up
    console.log("Map initialized:", map);

    // City data with names, descriptions, and coordinates
    const cityData = [
        { name: "Eldoria", description: "A bustling port city known for its skilled sailors and merchants.", lat: 10, lng: -20 },
        { name: "Mistral Peaks", description: "A secluded mountain village famous for its rare herbs.", lat: 30, lng: 15 },
        { name: "Dragon's Keep", description: "A fortress with rumors of a dragon sighting.", lat: -15, lng: 45 },
        { name: "Whispering Woods", description: "An ancient forest filled with magic and mystery.", lat: 5, lng: -50 },
        { name: "Shimmerlake", description: "A quiet town by a lake that glows under the moonlight.", lat: 25, lng: -10 }
    ];

    // Iterate over city data to create markers and bind popups with lore information
    cityData.forEach(city => {
        // Create marker for each city
        const marker = L.marker([city.lat, city.lng]).addTo(map);
        
        // Bind a popup with the city name and description (lore)
        marker.bindPopup(`<b>${city.name}</b><br>${city.description}`);
        
        // Log each marker to confirm it's set up
        console.log("Marker added:", city.name);
    });

    // Export map as PNG using html2canvas
    document.getElementById('export-png').addEventListener('click', function() {
        // Debug message
        console.log("Export button clicked");

        // Use html2canvas to capture the map as a PNG
        html2canvas(document.querySelector("#map")).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'fantasy_map.png';
            link.click();
        }).catch(error => console.error("Error capturing map:", error));
    });
} else {
    console.error("Map container not found. Check HTML structure.");
}

