// Alpha Vantage API key
const alphaVantageApiKey = '5FAXFFBSS5483KAN';
const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']; // Stock symbols
const apiDelay = 12000; // 12 seconds delay to avoid hitting rate limits

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

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

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

// Voting Script
const voteCounts = {
    JavaScript: 0,
    Python: 0,
    Java: 0,
    'C++': 0
};

Object.keys(voteCounts).forEach((option) => {
    const savedCount = localStorage.getItem(`votes-${option}`);
    if (savedCount !== null) {
        voteCounts[option] = parseInt(savedCount, 10);
    }
});

const hasVoted = localStorage.getItem('hasVoted');

function updateResults() {
    Object.keys(voteCounts).forEach((option) => {
        const resultElement = document.querySelector(`#result-${option} span`);
        if (resultElement) {
            resultElement.textContent = voteCounts[option];
        } else {
            console.warn(`Result element for ${option} is missing.`);
        }
    });
}

function vote(option) {
    if (hasVoted) {
        document.getElementById('message').textContent = 'You have already voted.';
        return;
    }

    voteCounts[option] += 1;
    localStorage.setItem(`votes-${option}`, voteCounts[option]);
    localStorage.setItem('hasVoted', 'true');

    updateResults();

    document.getElementById('message').textContent = 'Thank you for voting!';
}

updateResults();

// NASA APOD API
const nasaApiKey = '7TUUcxITpxatYafCvKe2UsM2wLfB5p5UrbDQLF77';
const nasaApiUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`;

document.addEventListener('DOMContentLoaded', () => {
    fetch(nasaApiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('apod-title').innerText = data.title;
            document.getElementById('apod-description').innerText = data.explanation;
            document.getElementById('apod-date').innerText = `Date: ${data.date}`;
            
            const imageElement = document.getElementById('apod-image');
            imageElement.src = data.url;
            imageElement.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching NASA APOD:', error);
            document.getElementById('apod-title').innerText = 'Error Loading Data';
            document.getElementById('apod-description').innerText = 'Unable to fetch data. Please try again later.';
        });
});

// The Cat API
const catApiKey = 'live_0I7jU3fVXbmomkf1DcgDbtAbKqLp7SIdVVmgsft6biCY3hLpcGPXrsy9REnqiD2O';
const catApiUrl = 'https://api.thecatapi.com/v1/images/search';

async function fetchCat(sectionId) {
    try {
        const response = await fetch(catApiUrl, {
            headers: {
                'x-api-key': catApiKey,
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const catImageUrl = data[0].url;

        const section = document.getElementById(sectionId);
        section.innerHTML = `
            <img src="${catImageUrl}" alt="A cute cat" style="max-width: 100%; border-radius: 10px;">
        `;
    } catch (error) {
        console.error(error);
        document.getElementById(sectionId).innerHTML = `
            <h2>Unable to load cat</h2>
            <p>Please check your internet connection or try again later.</p>
        `;
    }
}

fetchCat('cat1');
fetchCat('cat2');
