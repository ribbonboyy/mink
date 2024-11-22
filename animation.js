const sections = document.querySelectorAll('.section');
const tiltIntensity = 15; // Adjust intensity of the tilt

sections.forEach((section) => {
    let isAnimating = false;

    section.addEventListener('mousemove', (e) => {
        if (!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(() => {
                const rect = section.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const offsetX = e.clientX - centerX;
                const offsetY = e.clientY - centerY;

                const rotateX = (offsetY / rect.height) * tiltIntensity;
                const rotateY = -(offsetX / rect.width) * tiltIntensity;

                section.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                section.style.webkitTransform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                isAnimating = false;
            });
        }
    });

    section.addEventListener('mouseleave', () => {
        section.style.transform = 'rotateX(0deg) rotateY(0deg)';
        section.style.webkitTransform = 'rotateX(0deg) rotateY(0deg)';
    });
});

// Optional: Disable on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    sections.forEach(section => {
        section.style.transform = 'none';
    });
}
