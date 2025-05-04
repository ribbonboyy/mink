const textSnippets = [
  { text: "Bonjour, comment ça va?", language: "French" },
  { text: "Hola, ¿cómo estás?", language: "Spanish" },
  { text: "Hallo, wie geht es dir?", language: "German" },
  { text: "Ciao, come stai?", language: "Italian" },
  { text: "こんにちは、お元気ですか？", language: "Japanese" },
  { text: "Привет, как дела?", language: "Russian" },
  { text: "안녕하세요, 어떻게 지내세요?", language: "Korean" },
  { text: "你好，你怎么样？", language: "Chinese" },
  { text: "Merhaba, nasılsın?", language: "Turkish" },
  { text: "Hej, hur mår du?", language: "Swedish" }
];

let currentSnippet = {};
let score = 0;
let timeLeft = 10;
let timerInterval;

const textElement = document.getElementById('text-snippet');
const inputElement = document.getElementById('language-input');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const submitButton = document.getElementById('submit-btn');

function startGame() {
  loadNewSnippet();
  startTimer();
}

function loadNewSnippet() {
  const randomIndex = Math.floor(Math.random() * textSnippets.length);
  currentSnippet = textSnippets[randomIndex];
  textElement.textContent = currentSnippet.text;
  inputElement.value = '';
  feedbackElement.textContent = '';
  timeLeft = 10;
  updateTimerDisplay();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      feedbackElement.textContent = `Time's up! The correct answer was ${currentSnippet.language}.`;
      setTimeout(() => {
        loadNewSnippet();
        startTimer();
      }, 2000);
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerElement.textContent = `Time Left: ${timeLeft}s`;
}

submitButton.addEventListener('click', () => {
  const userGuess = inputElement.value.trim().toLowerCase();
  if (userGuess === currentSnippet.language.toLowerCase()) {
    score++;
    feedbackElement.textContent = 'Correct!';
  } else {
    feedbackElement.textContent = `Incorrect! The correct answer was ${currentSnippet.language}.`;
  }
  scoreElement.textContent = `Score: ${score}`;
  clearInterval(timerInterval);
  setTimeout(() => {
    loadNewSnippet();
    startTimer();
  }, 2000);
});

startGame();
