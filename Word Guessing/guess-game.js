const words = [
  { word: "moon", hint: "Lights the sky at night" },
  { word: "book", hint: "We read and learn from it" },
  { word: "sun", hint: "Rises every morning" },
  { word: "key", hint: "Opens the door" },
  { word: "phone", hint: "Used to make calls" },
  { word: "sea", hint: "A large body of salty water" },
  { word: "apple", hint: "A red or green fruit" },
  { word: "school", hint: "A place to study" }
];

let currentWordIndex = 0;
let attempts = 5;
let timeLeft = 30;
let timer;
let score = 0;
let totalWords = words.length;

function showWord() {
  const wordObj = words[currentWordIndex];
  document.getElementById("hint").innerText = "Hint: " + wordObj.hint;
  document.getElementById("attempts").innerText = attempts;
  document.getElementById("feedback").innerText = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").disabled = false;
  resetTimer();
}

function checkGuess() {
  const input = document.getElementById("guessInput").value.trim().toLowerCase();
  const correctWord = words[currentWordIndex].word.toLowerCase();

  if (input === correctWord) {
    document.getElementById("feedback").innerText = "✅ Correct!";
    clearInterval(timer);
    score++;
  } else {
    attempts--;
    document.getElementById("attempts").innerText = attempts;
    document.getElementById("feedback").innerText = "❌ Wrong! Try again.";
    if (attempts === 0) {
      document.getElementById("feedback").innerText = `❌ Out of attempts! The word was: ${correctWord}`;
      clearInterval(timer);
    }
  }
}

function nextWord() {
  if (currentWordIndex === totalWords - 1) {
    clearInterval(timer);
    document.getElementById("guessInput").disabled = true;

    let finalMessage = score === totalWords
      ? "🎉 Congratulations! You guessed all words correctly!"
      : `🏁 Game Over! You got ${score} out of ${totalWords} words right.`;

    document.getElementById("hint").innerText = "Game Finished";
    document.getElementById("feedback").innerText = finalMessage;
    return;
  }
  currentWordIndex++;
  attempts = 5;
  timeLeft = 30;
  showWord();
}
function resetTimer() {
  clearInterval(timer);
  timeLeft = 30;
  document.getElementById("timer").innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("feedback").innerText = `⏰ Time's up! The word was: ${words[currentWordIndex].word}`;
      document.getElementById("guessInput").disabled = true;
    }
  }, 1000);
}
window.onload = showWord;
