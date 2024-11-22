// Select all sections
const sections = document.querySelectorAll('.section');

// Add tilt effect to each section
sections.forEach((section) => {
    section.addEventListener('mousemove', (e) => {
        // Get the section's dimensions and position
        const rect = section.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate the cursor's distance from the center
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        // Scale these values for a subtle tilt effect
        const rotateX = (offsetY / rect.height) * 10; // Rotate up/down
        const rotateY = -(offsetX / rect.width) * 10; // Rotate left/right

        // Apply the transform to create the "balancing" effect
        section.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    section.addEventListener('mouseleave', () => {
        // Reset the section to its original state when the mouse leaves
        section.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    });
});
