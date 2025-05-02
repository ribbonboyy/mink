// minker the nigger
const sections = document.querySelectorAll('.section');
sections.forEach((section) => {
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        const tiltX = (offsetY / rect.height) * 15; 
        const tiltY = -(offsetX / rect.width) * 15; 

        section.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    section.addEventListener('mouseleave', () => {
        section.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});
