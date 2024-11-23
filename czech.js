document.addEventListener('DOMContentLoaded', () => {
    // Fetch live GDP and population data
    const gdpElement = document.getElementById('gdp');
    const populationElement = document.getElementById('population');

    async function fetchEconomicData() {
        try {
            const response = await fetch('https://api.worldbank.org/v2/country/CZ?format=json');
            const data = await response.json();
            const gdp = data[1][0].gdp; // Replace with actual API's GDP key
            const population = data[1][0].population; // Replace with actual API's Population key

            gdpElement.textContent = `$${(gdp / 1e9).toFixed(2)} Billion`;
            populationElement.textContent = `${(population / 1e6).toFixed(2)} Million`;
        } catch (error) {
            console.error('Error fetching data:', error);
            gdpElement.textContent = 'Unavailable';
            populationElement.textContent = 'Unavailable';
        }
    }

    fetchEconomicData();

    // Event Countdown Timer
    const countdownElement = document.getElementById('countdown');
    const eventDate = new Date('2024-05-12T00:00:00');

    function updateCountdown() {
        const now = new Date();
        const diff = eventDate - now;

        if (diff <= 0) {
            countdownElement.textContent = "The event is live!";
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }

    setInterval(updateCountdown, 1000);
});
