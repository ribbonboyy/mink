// Select all sections
const sections = document.querySelectorAll('.section');

// Add tilt effect to each section
sections.forEach((section) => {
    section.addEventListener('mousemove', (e) => {
        // Get the section's dimensions and position
        const rect = section.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate the mouse offset from the center of the section
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        // Scale the offset values to determine rotation
        const rotateX = (offsetY / rect.height) * 15; // Tilt up/down
        const rotateY = -(offsetX / rect.width) * 15; // Tilt left/right

        // Apply the transform to the section
        section.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    section.addEventListener('mouseleave', () => {
        // Reset the section when the mouse leaves
        section.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});
