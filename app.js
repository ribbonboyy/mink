document.addEventListener('DOMContentLoaded', () => {
    // Kanye Quote Fetcher
    const fetchQuoteBtn = document.getElementById('fetch-quote');
    if (fetchQuoteBtn) {
        fetchQuoteBtn.addEventListener('click', () => {
            fetch('https://api.kanye.rest/')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('quote').textContent = `"${data.quote}"`;
                })
                .catch(error => {
                    document.getElementById('quote').textContent = "Could not fetch Kanye quote.";
                    console.error(error);
                });
        });
    }

fetch(`https://owo.vc/api/owo?text=${encodeURIComponent(text)}`, { mode: 'no-cors' })
    .then(response => {
        // You can't process the response body in 'no-cors' mode.
        console.log('Request sent, but response is opaque.');
    })
    .catch(error => {
        console.error('CORS issue:', error);
    });


    // Fun Fact Generator
    const getFactBtn = document.getElementById('get-fact');
    if (getFactBtn) {
        getFactBtn.addEventListener('click', () => {
            fetch('https://asli-fun-fact-api.herokuapp.com/api/facts')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('fact').textContent = data.data.fact;
                })
                .catch(error => {
                    document.getElementById('fact').textContent = "Could not fetch a fun fact.";
                    console.error(error);
                });
        });
    }
});
