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

// Fetch and display the Astronomy Picture of the Day from NASA's API
const apiKey = '7TUUcxITpxatYafCvKe2UsM2wLfB5p5UrbDQLF77';
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

document.addEventListener('DOMContentLoaded', () => {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Update the DOM with data
            const titleElement = document.getElementById('apod-title');
            const descriptionElement = document.getElementById('apod-description');
            const dateElement = document.getElementById('apod-date');
            const imageElement = document.getElementById('apod-image');

            titleElement.innerText = data.title;
            descriptionElement.innerText = data.explanation;
            dateElement.innerText = `Date: ${data.date}`;
            imageElement.src = data.url;
            imageElement.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching NASA APOD:', error);

            // Fallback in case of an error
            document.getElementById('apod-title').innerText = 'Error Loading Data';
            document.getElementById('apod-description').innerText = 'Unable to fetch data from NASA API. Please try again later.';
        });
});



