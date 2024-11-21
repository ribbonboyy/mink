// Select all sections
const sections = document.querySelectorAll('.section');

// Add mousemove event listener to the document
document.addEventListener('mousemove', (e) => {
    // Get the center of the viewport (to calculate relative movement)
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    // Loop through each section
    sections.forEach(section => {
        // Get the section's position and dimensions
        const rect = section.getBoundingClientRect();
        const sectionCenterX = rect.left + rect.width / 2;
        const sectionCenterY = rect.top + rect.height / 2;

        // Calculate cursor offset relative to the section's center
        const offsetX = e.clientX - sectionCenterX;
        const offsetY = e.clientY - sectionCenterY;

        // Smooth out the rotation effect
        const rotateX = (offsetY / rect.height) * 10; // Tilt along the X-axis (limit to ±10 degrees)
        const rotateY = -(offsetX / rect.width) * 10; // Tilt along the Y-axis (limit to ±10 degrees)

        // Apply rotation with a smooth easing effect
        section.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// Reset the section when the mouse leaves the viewport
document.addEventListener('mouseleave', () => {
    sections.forEach(section => {
        section.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    });
});
