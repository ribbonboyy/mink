// Simulated 90s "search engine" functionality
const results = {
    roblox: `
        <h2>Roblox - 1995</h2>
        <p>Welcome to the earliest version of Roblox! It's simple, fun, and... totally imaginary.</p>
        <img src="https://via.placeholder.com/300x200" alt="Old Roblox Screenshot">
        <p><a href="#">Visit Roblox (1995)</a></p>
    `,
    google: `
        <h2>Google - 1995</h2>
        <p>Google is a search engine for the future! Back in the day, it was just starting out. Here's a taste:</p>
        <img src="https://via.placeholder.com/300x200" alt="Old Google Screenshot">
        <p><a href="#">Visit Google (1995)</a></p>
    `,
    yahoo: `
        <h2>Yahoo - 1995</h2>
        <p>Yahoo was the king of the web directories in the mid-90s. Enjoy this retro look!</p>
        <img src="https://via.placeholder.com/300x200" alt="Old Yahoo Screenshot">
        <p><a href="#">Visit Yahoo (1995)</a></p>
    `,
};

document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document.getElementById("search-input").value.toLowerCase();
    const resultContainer = document.getElementById("result");

    if (results[query]) {
        resultContainer.innerHTML = results[query];
    } else {
        resultContainer.innerHTML = `<p>No results found for "${query}". Try another search!</p>`;
    }
});
