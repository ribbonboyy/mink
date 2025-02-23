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

  document.addEventListener('DOMContentLoaded', () => {
    const convertBtn = document.getElementById('convert');
    if (convertBtn) {
        convertBtn.addEventListener('click', () => {
            const inputField = document.getElementById('input-text'); // Reference the input field
            const text = inputField.value; // Get the value entered by the user
            
            if (text.trim() !== "") { // Ensure there's text to convert
                // Use AllOrigins CORS Proxy
                fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://owo.vc/api/owo?text=${text}`)}`)
                    .then(response => response.json())
                    .then(data => {
                        // Extract and display OwOified text
                        document.getElementById('output-text').textContent = data.contents; 
                    })
                    .catch(error => {
                        // Display error if the API call fails
                        document.getElementById('output-text').textContent = "Could not OwOify the text.";
                        console.error(error);
                    });
            } else {
                document.getElementById('output-text').textContent = "Please enter some text!";
            }
        });
    }
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
