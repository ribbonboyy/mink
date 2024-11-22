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

const apiKey = '49JUJZZ2UXPCOEP5'; // Alpha Vantage API key
const stocksPerPage = 5; // Number of stocks to display per page
const stockSymbols = [
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA',
    'META', 'NFLX', 'NVDA', 'AMD', 'BABA',
    'DIS', 'JPM', 'V', 'WMT', 'PYPL',
    'INTC', 'KO', 'PEP', 'CSCO', 'ADBE'
]; // Expanded list of stock symbols

let currentPage = 1; // Track the current page
const apiUrl = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${stockSymbols.join(',')}&apikey=${apiKey}`;

// Fetch stock data
async function fetchStockData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

        const data = await response.json();

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

// Display stocks for the current page
function displayStocks(stockData) {
    const startIndex = (currentPage - 1) * stocksPerPage;
    const endIndex = Math.min(startIndex + stocksPerPage, stockData.length);
    const currentStocks = stockData.slice(startIndex, endIndex);

    const stocksList = document.getElementById('stocks-list');
    stocksList.innerHTML = ''; // Clear previous list

    const ul = document.createElement('ul');
    currentStocks.forEach((stock) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${stock['1. symbol']}</strong>: $${parseFloat(stock['2. price']).toFixed(2)} 
                        (Volume: ${stock['3. volume']})`;
        ul.appendChild(li);
    });

    stocksList.appendChild(ul);

    // Update pagination controls
    updatePagination(stockData.length);
}

// Update pagination controls
function updatePagination(totalStocks) {
    const totalPages = Math.ceil(totalStocks / stocksPerPage);
    const pagination = document.getElementById('pagination-controls');
    pagination.innerHTML = '';

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        currentPage--;
        displayStocksWithPagination();
    });
    pagination.appendChild(prevButton);

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        currentPage++;
        displayStocksWithPagination();
    });
    pagination.appendChild(nextButton);

    // Page info
    const pageInfo = document.createElement('span');
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    pagination.appendChild(pageInfo);
}

// Fetch data and initialize pagination
async function displayStocksWithPagination() {
    const stocksList = document.getElementById('stocks-list');
    stocksList.innerHTML = '<p>Loading stocks...</p>';

    const stockData = await fetchStockData();

    if (stockData) {
        displayStocks(stockData);
    } else {
        stocksList.innerHTML = '<p>Failed to load stocks.</p>';
    }
}

// Initialize the page
displayStocksWithPagination();

