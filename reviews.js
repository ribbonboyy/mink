const reviews = [
  {
    text: "I visited PrettyFunny.xyz and now my dog speaks fluent sarcasm.",
    author: "Alex J."
  },
  {
    text: "PrettyFunny.xyz is like an internet fever dream. I woke up fluent in meme.",
    author: "Jamie L."
  },
  {
    text: "After using this site, my toaster became self-aware. Coincidence?",
    author: "Morgan S."
  },
  {
    text: "I laughed so hard, my neighbor filed a noise complaint. Worth it.",
    author: "Dana P."
  },
  {
    text: "I thought this was a serious site... then I saw the dancing banana.",
    author: "Taylor R."
  }
];

document.getElementById('generate-btn').addEventListener('click', () => {
  const r = reviews[Math.floor(Math.random() * reviews.length)];
  document.getElementById('review-card').innerHTML = `
    <p>"${r.text}"</p>
    <p><strong>– ${r.author}</strong></p>
  `;
});

document.getElementById('review-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const review = document.getElementById('review-text').value;
  const name = document.getElementById('reviewer-name').value;
  document.getElementById('confirmation-msg').textContent = `Review submitted. Thank you, ${name}! (Disclaimer: It'll never be read 😂)`;
  this.reset();
});
