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
const apiUrl = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${stockSymbols.join(',')}&apikey=${apiKey}`;

async function fetchStockData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        
        const data = await response.json();
        
        // Debug: Log the raw response
        console.log(data);

        if (data['Stock Quotes']) {
            return data['Stock Quotes'];
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        console.error('Error fetching stock data:', error.message);
        return null;
    }
}

async function displayStocks() {
    const stocksList = document.getElementById('stocks-list');
    stocksList.innerHTML = '<p>Loading stocks...</p>';

    const stockData = await fetchStockData();
    stocksList.innerHTML = ''; // Clear loading message

    if (stockData) {
        const ul = document.createElement('ul');
        stockData.forEach((stock) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${stock['1. symbol']}</strong>: $${parseFloat(stock['2. price']).toFixed(2)} 
                            (Volume: ${stock['3. volume']})`;
            ul.appendChild(li);
        });
        stocksList.appendChild(ul);
    } else {
        stocksList.innerHTML = '<p>Failed to load stocks.</p>';
    }
}

// Call the display function when the page loads
displayStocks();

