<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fun APIs</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <!-- Kanye Quote Section -->
        <div class="section" id="quote-section">
            <h2>Kanye Quotes</h2>
            <p id="quote">Click the button to get a random Kanye West quote!</p>
            <button id="fetch-quote" class="btn">Get Kanye Quote</button>
        </div>

        <!-- OwOify Text Section -->
        <div class="section" id="owoify-section">
            <h2>OwOify Text</h2>
            <textarea id="input-text" rows="4" placeholder="Enter text here..."></textarea>
            <button id="convert" class="btn">OwOify</button>
            <p id="output-text">Your OwOified text will appear here.</p>
        </div>

        <!-- Fun Fact Section -->
        <div class="section" id="fun-fact-section">
            <h2>Random Fun Fact</h2>
            <p id="fact">Click the button to get a fun fact!</p>
            <button id="get-fact" class="btn">Get Fun Fact</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
