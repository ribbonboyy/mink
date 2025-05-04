const funnyReviews = [
  "I laughed so hard I snorted cereal out of my nose.",
  "PrettyFunny.xyz made my goldfish question its existence.",
  "The jokes are so bad, they’re good. Like, Oscar-worthy bad.",
  "I showed this site to my boss. I got promoted. No correlation probably.",
  "It’s like the internet ate a clown and threw up joy.",
  "10/10 would laugh again. And again. And again.",
  "I'm not saying this site changed my life, but my cat now pays rent.",
  "I visited PrettyFunny.xyz and now my grandma speaks in memes.",
  "Honestly, this site should be illegal — too funny for free."
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

      const reviewCard = document.createElement('div');
      reviewCard.className = 'review-card';
      reviewCard.innerHTML = `
        <img class="review-img" src="${photo}" alt="${name}" />
        <div class="review-content">
          <div class="stars">${stars}</div>
          <div class="review-text">"${review}"</div>
          <div class="review-name">– ${name}</div>
        </div>
      `;
      container.appendChild(reviewCard);
    });
  } catch (err) {
    console.error('Error loading reviews:', err);
    container.innerHTML = '<p style="text-align:center;">Could not load reviews. Try reloading.</p>';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadReviews();
});
