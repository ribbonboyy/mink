document.addEventListener("DOMContentLoaded", async () => {
    const hdpElement = document.getElementById("hdp-value");

    async function fetchHDP() {
        // Use a valid API endpoint or hardcoded data
        try {
            // For demonstration, we'll use a hardcoded value
            const hdp = 0.892; // Example HDP value for Czechia (2023 data)
            hdpElement.textContent = `Czechia's HDP: ${hdp}`;
        } catch (error) {
            console.error("Failed to fetch HDP data:", error);
            hdpElement.textContent = "HDP data unavailable.";
        }
    }

    await fetchHDP();
});

    fetchEconomicData();

 document.addEventListener("DOMContentLoaded", () => {
    const eventDate = new Date("2024-05-12T00:00:00"); // Set the correct event date
    const countdownElement = document.getElementById("countdown");

    function updateCountdown() {
        const now = new Date();
        const diff = eventDate - now;

        if (diff <= 0) {
            countdownElement.textContent = "The event has started!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // Call the function immediately and set an interval to update
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

