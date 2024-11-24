document.addEventListener('DOMContentLoaded', () => {
    const planets = document.querySelectorAll('.planet');
    const infoText = document.getElementById('info-text');

    planets.forEach(planet => {
        planet.addEventListener('click', () => {
            const planetInfo = planet.getAttribute('data-info');
            infoText.textContent = planetInfo;
        });
    });
});
