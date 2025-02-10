document.addEventListener("DOMContentLoaded", function () {
    const warningPopup = document.getElementById("warning-popup");
    const agreeBtn = document.getElementById("agree-btn");
    const mainContent = document.querySelector(".container");

    agreeBtn.addEventListener("click", function () {
        warningPopup.style.display = "none";  // Hide the popup
        mainContent.style.display = "block";  // Show the main content
    });
});
