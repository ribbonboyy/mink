document.getElementById('generate-btn').addEventListener('click', generateUser);

async function generateUser() {
  const userCard = document.getElementById('user-card');
  userCard.innerHTML = `<h2>Loading...</h2><p>Please wait while we fetch a random user.</p>`;

  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];

    userCard.innerHTML = `
      <h2>${user.name.first} ${user.name.last}</h2>
      <img src="${user.picture.large}" alt="Profile Picture" style="border-radius: 50%; margin: 15px 0; width: 120px; height: 120px;">
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
    `;
  } catch (error) {
    userCard.innerHTML = `<h2>Error</h2><p>Failed to fetch user. Please try again later.</p>`;
    console.error('Error fetching user:', error);
  }
}
