// Array of code snippets
const codeSnippets = [
  `// JavaScript Example
function greet(name) {
  return 'Hello, ' + name + '!';
}
console.log(greet('Mink.dev'));`,

  `/* CSS Example */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #282a36;
  color: #ffffff;
}`,

  `<!-- HTML Example -->
<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Welcome to My Page</h1>
</body>
</html>`,

  // Add more snippets here as needed
];

// Function to display a random code snippet
function displayRandomCode() {
  const randomIndex = Math.floor(Math.random() * codeSnippets.length);
  document.getElementById('code-content').textContent = codeSnippets[randomIndex];
}

// Event listener for button click to load a new snippet
document.getElementById('new-code-btn').addEventListener('click', displayRandomCode);

// Display a random snippet on page load
window.onload = displayRandomCode;
