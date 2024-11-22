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
