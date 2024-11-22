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

const apiKey = '49JUJZZ2UXPCOEP5'; // Replace with your API key from Alpha Vantage or another provider
const apiUrl = `https://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=AAPL,MSFT,GOOGL,AMZN,TSLA`;

async function fetchStocks() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch stock data');
        const data = await response.json();

        const stocks = data.data;
        displayStocks(stocks);
    } catch (error) {
        console.error(error);
        document.getElementById('stocks-list').innerHTML = `<p>Failed to load stocks.</p>`;
    }
}

function displayStocks(stocks) {
    const stocksList = document.getElementById('stocks-list');
    stocksList.innerHTML = '';

    const ul = document.createElement('ul');
    stocks.forEach(stock => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${stock.symbol}</strong>: $${stock.close} (${stock.date})`;
        ul.appendChild(li);
    });

    stocksList.appendChild(ul);
}

fetchStocks();
