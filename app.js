document.getElementById('get-fact').addEventListener('click', () => {
    fetch('https://asli-fun-fact-api.herokuapp.com/api/facts')
        .then(response => response.json())
        .then(data => {
            document.getElementById('fact').textContent = data.data.fact;
        })
        .catch(error => {
            document.getElementById('fact').textContent = "Oops! Couldn't fetch a fun fact.";
            console.error(error);
        });
});

document.getElementById('convert').addEventListener('click', () => {
    const text = document.getElementById('input-text').value;
    fetch(`https://owo.vc/api/owo?text=${encodeURIComponent(text)}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('output-text').textContent = data;
        })
        .catch(error => {
            document.getElementById('output-text').textContent = "Error: Could not OwOify the text.";
            console.error(error);
        });
});

document.getElementById('fetch-quote').addEventListener('click', () => {
    fetch('https://api.kanye.rest/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('quote').textContent = `"${data.quote}"`;
        })
        .catch(error => {
            document.getElementById('quote').textContent = "Oops! Something went wrong.";
            console.error(error);
        });
});
