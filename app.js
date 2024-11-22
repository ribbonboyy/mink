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

    // OwOify Text Converter
    const convertBtn = document.getElementById('convert');
    if (convertBtn) {
        convertBtn.addEventListener('click', () => {
            const text = document.getElementById('input-text').value;
            fetch(`https://owo.vc/api/owo?text=${encodeURIComponent(text)}`)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('output-text').textContent = data;
                })
                .catch(error => {
                    document.getElementById('output-text').textContent = "Could not OwOify the text.";
                    console.error(error);
                });
        });
    }

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
