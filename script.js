// Select all sections
const sections = document.querySelectorAll('.section');

// Add event listeners for hover effects
sections.forEach(section => {
    section.addEventListener('mousemove', (e) => {
        // Get the section's position and dimensions
        const rect = section.getBoundingClientRect();
        const sectionCenterX = rect.left + rect.width / 2;
        const sectionCenterY = rect.top + rect.height / 2;

        // Calculate cursor offset relative to the section's center
        const offsetX = e.clientX - sectionCenterX;
        const offsetY = e.clientY - sectionCenterY;

        // Smooth out the rotation effect
        const rotateX = (offsetY / rect.height) * 10; // Tilt along the X-axis (limit to ±10 degrees)
        const rotateY = -(offsetX / rect.width) * 10; // Tilt along the Y-axis (limit to ±10 degrees)

        // Apply rotation to the section
        section.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset the section when the mouse leaves
    section.addEventListener('mouseleave', () => {
        section.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    });
});

const apiKey = '5FAXFFBSS5483KAN'; // Alpha Vantage API key
const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']; // Stock symbols

async function fetchStockData(symbol) {
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        
        const data = await response.json();
        
        // Debug: Log the raw response
        console.log(data);

        if (data['Global Quote']) {
            return data['Global Quote'];
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error.message);
        return null;
    }
}

async function displayStocks() {
    const stocksList = document.getElementById('stocks-list');
    stocksList.innerHTML = '<p>Loading stocks...</p>';

    // Fetch all stock data concurrently
    const stockDataPromises = stockSymbols.map((symbol) => fetchStockData(symbol));
    const stockDataResults = await Promise.all(stockDataPromises);

    // Clear loading message
    stocksList.innerHTML = ''; 

    const ul = document.createElement('ul');

    stockDataResults.forEach((stockData, index) => {
        if (stockData) {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${stockSymbols[index]}</strong>: 
                $${parseFloat(stockData['05. price']).toFixed(2)} 
                (Volume: ${stockData['06. volume']})
            `;
            ul.appendChild(li);
        } else {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${stockSymbols[index]}</strong>: Failed to load data`;
            ul.appendChild(li);
        }
    });

    stocksList.appendChild(ul);
}

// Call the display function when the page loads
displayStocks();

