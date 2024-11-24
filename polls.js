// Initialize the vote counts for each option
const votes = {
    JavaScript: 0,
    Python: 0,
    Java: 0,
    "C++": 0,
};

// Function to handle voting
function vote(language) {
    const userVoted = localStorage.getItem("userVoted");

    if (userVoted) {
        // If the user has already voted, show an error message
        displayMessage("You have already voted! Duplicate voting is not allowed.", "red");
        return;
    }

    if (votes[language] !== undefined) {
        // Increment the vote count for the selected language
        votes[language]++;
        
        // Update the vote count in the DOM
        const resultElement = document.getElementById(`result-${language}`);
        const voteCountSpan = resultElement.querySelector("span");
        voteCountSpan.textContent = votes[language];
        
        // Store in local storage to mark that this user has voted
        localStorage.setItem("userVoted", "true");

        // Display a message confirming the vote
        displayMessage(`Thank you for voting for ${language}!`, "#4caf50"); // Success green color
    } else {
        console.error("Invalid language selected");
    }
}

// Utility function to display messages
function displayMessage(text, color) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = text;
    messageElement.style.color = color;

    // Clear the message after 2 seconds
    setTimeout(() => {
        messageElement.textContent = "";
    }, 2000);
}
