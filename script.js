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

const apiKey = '49JUJZZ2UXPCOEP5'; // Your Alpha Vantage API key
const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']; // List of stock symbols
const apiUrl = 'https://www.alphavantage.co/query';

async function fetchStock(symbol) {
    try {
        const response = await fetch(`${apiUrl}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
        if (!response.ok) throw new Error(`Failed to fetch data for ${symbol}`);
        const data = await response.json();
        return data['Global Quote'];
    } catch (error) {
        console.error(error);
        return null; // Handle error gracefully
    }
}

async function fetchAllStocks() {
    const stocksList = document.getElementById('stocks-list');
    stocksList.innerHTML = '<p>Loading stocks...</p>';

    const stockData = await Promise.all(stockSymbols.map(fetchStock));

    stocksList.innerHTML = ''; // Clear loading text

    const ul = document.createElement('ul');
    stockData.forEach((stock, index) => {
        if (stock) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${stock['01. symbol']}</strong>: $${parseFloat(stock['05. price']).toFixed(2)} (Change: ${stock['09. change']}%)`;
            ul.appendChild(li);
        } else {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${stockSymbols[index]}</strong>: Failed to load data`;
            ul.appendChild(li);
        }
    });

    stocksList.appendChild(ul);
}

// Fetch all stocks on page load
fetchAllStocks();
