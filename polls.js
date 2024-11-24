// Initialize the vote counts for each option
const votes = {
    JavaScript: 0,
    Python: 0,
    Java: 0,
    "C++": 0,
};

// Function to handle voting
function vote(language) {
    if (votes[language] !== undefined) {
        // Increment the vote count for the selected language
        votes[language]++;
        
        // Update the vote count in the DOM
        const resultElement = document.getElementById(`result-${language}`);
        const voteCountSpan = resultElement.querySelector("span");
        voteCountSpan.textContent = votes[language];
        
        // Display a message confirming the vote
        const messageElement = document.getElementById("message");
        messageElement.textContent = `Thank you for voting for ${language}!`;
        messageElement.style.color = "#4caf50"; // Success green color
        
        // Clear the message after 2 seconds
        setTimeout(() => {
            messageElement.textContent = "";
        }, 2000);
    } else {
        console.error("Invalid language selected");
    }
}
