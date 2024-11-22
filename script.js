// Alpha Vantage API key
const alphaVantageApiKey = '5FAXFFBSS5483KAN';
const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']; // Stock symbols
const apiDelay = 12000; // 12 seconds delay to avoid hitting rate limits

// NASA APOD API key
const nasaApiKey = '7TUUcxITpxatYafCvKe2UsM2wLfB5p5UrbDQLF77';

// The Cat API key
const catApiKey = 'live_0I7jU3fVXbmomkf1DcgDbtAbKqLp7SIdVVmgsft6biCY3hLpcGPXrsy9REnqiD2O';

// DOMContentLoaded ensures DOM is ready before script runs
document.addEventListener('DOMContentLoaded', () => {
    displayStocks();
    fetchAPOD();
    fetchCat('cat1');
    fetchCat('cat2');
});

// Utility function to add a delay
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Fetch and display stock data
async function displayStocks() {
    const stocksList = document.getElementById('stocks-list');
    if (!stocksList) {
        console.error('Element with id "stocks-list" not found.');
        return;
    }

    stocksList.innerHTML = '<p>Loading stocks...</p>';

    const ul = document.createElement('ul');

    for (const symbol of stockSymbols) {
        const stockData = await fetchStockData(symbol);

        const li = document.createElement('li');
        if (stockData) {
            li.innerHTML = `
                <strong>${symbol}</strong>: 
                $${parseFloat(stockData['05. price']).toFixed(2)} 
                (Volume: ${stockData['06. volume']})
            `;
        } else {
            li.innerHTML = `<strong>${symbol}</strong>: Failed to load data`;
        }

        ul.appendChild(li);
        await delay(apiDelay);
    }

    stocksList.innerHTML = '';
    stocksList.appendChild(ul);
}

// Fetch stock data from Alpha Vantage
async function fetchStockData(symbol) {
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${alphaVantageApiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        
        const data = await response.json();
        console.log(`Response for ${symbol}:`, data);

        if (data['Note'] || data['Information']) {
            throw new Error(data['Note'] || data['Information']);
        }

        if (data['Global Quote'] && data['Global Quote']['05. price']) {
            return data['Global Quote'];
        } else {
            throw new Error(`Invalid response structure for symbol ${symbol}`);
        }
    } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error.message);
        return null;
    }
}

// Fetch NASA APOD data
async function fetchAPOD() {
    const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`;
    const titleElement = document.getElementById('apod-title');
    const descriptionElement = document.getElementById('apod-description');
    const dateElement = document.getElementById('apod-date');
    const imageElement = document.getElementById('apod-image');

    try {
        const response = await fetch(nasaApiUrl);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        
        const data = await response.json();
        titleElement.textContent = data.title;
        descriptionElement.textContent = data.explanation;
        dateElement.textContent = `Date: ${data.date}`;
        imageElement.src = data.url;
        imageElement.style.display = 'block';
    } catch (error) {
        console.error('Error fetching NASA APOD:', error.message);
        titleElement.textContent = 'Error Loading Data';
        descriptionElement.textContent = 'Unable to fetch data. Please try again later.';
    }
}

// Fetch random cat image
async function fetchCat(sectionId) {
    const catApiUrl = 'https://api.thecatapi.com/v1/images/search';
    const section = document.getElementById(sectionId);

    try {
        const response = await fetch(catApiUrl, {
            headers: {
                'x-api-key': catApiKey,
            },
        });
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        
        const data = await response.json();
        const catImageUrl = data[0].url;

        section.innerHTML = `
            <img src="${catImageUrl}" alt="A cute cat" style="max-width: 100%; border-radius: 10px;">
        `;
    } catch (error) {
        console.error(`Error fetching cat image:`, error.message);
        section.innerHTML = `
            <h2>Unable to load cat</h2>
            <p>Please try again later.</p>
        `;
    }
}
