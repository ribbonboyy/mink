// Select all sections
const sections = document.querySelectorAll('.section');

// Add mousemove event listener to the document
document.addEventListener('mousemove', (e) => {
    // Loop through each section
    sections.forEach(section => {
        // Get the section's position and dimensions
        const rect = section.getBoundingClientRect();
        const sectionCenterX = rect.left + rect.width / 2; // Center X of the section
        const sectionCenterY = rect.top + rect.height / 2; // Center Y of the section

        // Calculate the offset of the cursor relative to the section's center
        const offsetX = e.clientX - sectionCenterX;
        const offsetY = e.clientY - sectionCenterY;

        // Calculate rotation angles (limit to avoid extreme tilt)
        const rotateX = Math.max(Math.min(offsetY / 15, 10), -10); // Limit X tilt between -10 and 10
        const rotateY = Math.max(Math.min(-offsetX / 15, 10), -10); // Limit Y tilt between -10 and 10

        // Apply CSS transform to the section
        section.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// Reset the section when the mouse leaves the window
document.addEventListener('mouseleave', () => {
    sections.forEach(section => {
        section.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});
