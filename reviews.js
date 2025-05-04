const funnyReviews = [
  "best website in the world",
  "changed my view on life. absolute cinema",
  "i like their pages, pretty awesome",
  "+rep latte, coolest dev",
  "made me smile",
  "their atom page taught me how an atom of xenon looks",
  "honestly, i like this website ",
  "pretty cool",
  "awesome",
  "yeah i guess that i like this",
  "what can i say, amazing! :D",
  "cool. i like how positive all the reviews are too! :3",
  "you can see that a lof of time has been poured into this project",
  "amazing! just pure cinema."
];

const stars = '⭐️⭐️⭐️⭐️⭐️';

async function loadReviews(count = 6) {
  const container = document.getElementById('reviews-wrapper');

  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await response.json();

    data.results.forEach(user => {
      const name = `${user.name.first} ${user.name.last}`;
      const photo = user.picture.medium;
      const review = funnyReviews[Math.floor(Math.random() * funnyReviews.length)];

      const section = document.createElement('div');
      section.className = 'section';
      section.innerHTML = `
        <img src="${photo}" alt="${name}" style="border-radius: 50%; width: 60px; height: 60px; border: 2px solid #2D3C41; margin-bottom: 10px;">
        <h2>${name}</h2>
        <div style="color: #FFD700; font-size: 1.2rem; margin-bottom: 8px;">${stars}</div>
        <p>"${review}"</p>
      `;

      container.appendChild(section);
    });
  } catch (err) {
    console.error('Error loading reviews:', err);
    container.innerHTML = `<div class="section"><p>Could not load reviews. Try reloading.</p></div>`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadReviews();
});
