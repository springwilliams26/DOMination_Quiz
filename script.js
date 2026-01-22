// DOMination Quiz - Questions
const quizData = [
  {
    question:
      "Which keyword is used to declare a variable that can be reassigned?",
    options: ["const", "let", "function", "return"],
    answer: 1,
  },
  {
    question: "Which array method adds an element to the end of an array?",
    options: ["pop()", "shift()", "push()", "unshift()"],
    answer: 2,
  },
  {
    question: "What does document.getElementById('demo') return?",
    options: [
      "An array of elements with id='demo'",
      "A single element with id='demo' (or null if not found)",
      "A string containing the id name",
      "A boolean indicating if the id exists",
    ],
    answer: 1,
  },
  {
    question:
      "Which loop is best when you know exactly how many times to repeat?",
    options: ["for", "while", "do...while", "for...in"],
    answer: 0,
  },
  {
    question: "What is the result of: typeof [] ?",
    options: ["undefined", "list", "array", "object"],
    answer: 3,
  },
];

// Grab DOM elements
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");

const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

// State
let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;

// Load the current question onto the page
function loadQuestion() {
  hasAnswered = false;
  nextButton.disabled = true;

  // Clear old options
  optionsContainer.innerHTML = "";

  const currentQuestion = quizData[currentQuestionIndex];
  questionContainer.textContent = `Q${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn", "neutral");
    btn.textContent = option;

    btn.addEventListener("click", () => selectOption(index));

    optionsContainer.appendChild(btn);
  });
}

// Handle option selection
function selectOption(selectedIndex) {
  if (hasAnswered) return;
  hasAnswered = true;

  const currentQuestion = quizData[currentQuestionIndex];
  const correctIndex = currentQuestion.answer;

  const optionButtons = optionsContainer.querySelectorAll("button");

  // Disable all buttons so user can't change their answer
  optionButtons.forEach((btn) => (btn.disabled = true));

  // Mark selected as correct/incorrect
  if (selectedIndex === correctIndex) {
    score++;
    optionButtons[selectedIndex].classList.remove("neutral");
    optionButtons[selectedIndex].classList.add("correct");
  } else {
    optionButtons[selectedIndex].classList.remove("neutral");
    optionButtons[selectedIndex].classList.add("incorrect");

    // Also show the correct answer in green for immediate feedback
    optionButtons[correctIndex].classList.remove("neutral");
    optionButtons[correctIndex].classList.add("correct");
  }

  nextButton.disabled = false;
}

// Move to next question or end the quiz
function nextQuestion() {
  if (!hasAnswered) return;

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

// Show final score screen
function showScore() {
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${quizData.length}.`;
}

// Restart quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  hasAnswered = false;

  scoreContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  loadQuestion();
}

// Event listeners
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Start the quiz
loadQuestion();
