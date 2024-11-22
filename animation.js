// Select all sections
const sections = document.querySelectorAll('.section');

// Add tilt effect
sections.forEach((section) => {
    section.addEventListener('mousemove', (e) => {
        // Get dimensions and center point
        const rect = section.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate the offset of the cursor from the center
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        // Scale the offsets for a realistic tilt effect
        const tiltX = (offsetY / rect.height) * 15; // Strength of tilt up/down
        const tiltY = -(offsetX / rect.width) * 15; // Strength of tilt left/right

        // Apply the transform
        section.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    section.addEventListener('mouseleave', () => {
        // Reset the tilt when mouse leaves
        section.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});
