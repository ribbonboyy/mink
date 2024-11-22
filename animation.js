// Select all sections
const sections = document.querySelectorAll('.section');

// Add mousemove and mouseleave event listeners
sections.forEach(section => {
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect(); // Get section dimensions
        const centerX = rect.left + rect.width / 2;   // Horizontal center
        const centerY = rect.top + rect.height / 2;  // Vertical center

        // Calculate offset between cursor position and center of the section
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        // Calculate tilt angles
        const rotateX = (offsetY / rect.height) * 15; // Vertical tilt (limit ±15 degrees)
        const rotateY = -(offsetX / rect.width) * 15; // Horizontal tilt (limit ±15 degrees)

        // Apply the tilt effect
        section.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        section.style.transition = 'transform 0s'; // Disable transition during movement
    });

    section.addEventListener('mouseleave', () => {
        // Reset tilt when the cursor leaves the section
        section.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
        section.style.transition = 'transform 0.2s ease-out'; // Smooth return
    });
});
