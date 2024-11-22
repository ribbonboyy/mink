const apiKey = '5FAXFFBSS5483KAN'; // Alpha Vantage API key
const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']; // Stock symbols
const apiDelay = 12000; // 12 seconds delay to avoid hitting rate limits (adjust as needed)

async function fetchStockData(symbol) {
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        
        const data = await response.json();

        // Debug: Log the entire response to see the structure
        console.log(`Response for ${symbol}:`, data);

        // Check for rate limit or unexpected messages
        if (data['Note'] || data['Information']) {
            throw new Error(data['Note'] || data['Information']);
        }

        // Validate the structure for 'Global Quote'
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

// Utility function to add a delay
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function displayStocks() {
    const stocksList = document.getElementById('stocks-list');
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
        
        // Add delay to avoid hitting API rate limits
        await delay(apiDelay);
    }

    // Clear loading message and display stocks
    stocksList.innerHTML = '';
    stocksList.appendChild(ul);
}

// Call the display function when the page loads
displayStocks();

// script.js

// Initialize vote counts (mock data)
const voteCounts = {
    JavaScript: 0,
    Python: 0,
    Java: 0,
    'C++': 0
};

// Load initial vote counts from local storage, if available
Object.keys(voteCounts).forEach((option) => {
    const savedCount = localStorage.getItem(`votes-${option}`);
    if (savedCount !== null) {
        voteCounts[option] = parseInt(savedCount, 10);
    }
});

// Check if user has already voted
const hasVoted = localStorage.getItem('hasVoted');

// Display initial results
function updateResults() {
    Object.keys(voteCounts).forEach((option) => {
        document.querySelector(`#result-${option} span`).textContent = voteCounts[option];
    });
}

// Voting function
function vote(option) {
    if (hasVoted) {
        document.getElementById('message').textContent = 'You have already voted.';
        return;
    }

    // Increment the vote count
    voteCounts[option] += 1;

    // Save updated count to local storage
    localStorage.setItem(`votes-${option}`, voteCounts[option]);

    // Mark user as having voted
    localStorage.setItem('hasVoted', 'true');

    // Update the results display
    updateResults();

    // Show confirmation message
    document.getElementById('message').textContent = 'Thank you for voting!';
}

// Initialize the results on page load
updateResults();

// NASA APOD API Key and URL
const apiKey3 = '7TUUcxITpxatYafCvKe2UsM2wLfB5p5UrbDQLF77';
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey3}`;

document.addEventListener('DOMContentLoaded', () => {
    // Fetch NASA APOD data
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Populate the page with APOD data
            document.getElementById('apod-title').innerText = data.title;
            document.getElementById('apod-description').innerText = data.explanation;
            document.getElementById('apod-date').innerText = `Date: ${data.date}`;
            
            // Update and display the image
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

// script.js

// The Cat API URL
const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY2 = 'live_0I7jU3fVXbmomkf1DcgDbtAbKqLp7SIdVVmgsft6biCY3hLpcGPXrsy9REnqiD2O';

// Fetch a random cat and display it in the specified section
async function fetchCat(sectionId) {
    try {
        const response = await fetch(CAT_API_URL, {
            headers: {
                'x-api-key': API_KEY2,
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

// Fetch two random cats
fetchCat('cat1');
fetchCat('cat2');
